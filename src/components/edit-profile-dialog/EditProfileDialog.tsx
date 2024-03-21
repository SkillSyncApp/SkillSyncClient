import { ChangeEvent, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { GET_ALL_POSTS } from "../../query-keys/queries";
import { updateUserProfile } from "../../services/authService";
import { userState } from "../../store/atoms/userAtom";
import { UpdateUserInput } from "../../types/User";
import Dialog from "../shared/dialog/Dialog";
import { uploadImage } from "../../services/fileUploadService";
import { truncateMiddle } from "../../utils/truncate";
import { XCircleIcon } from "@heroicons/react/24/solid";

type EditProfileDialogProps = {
  show: boolean;
  onClose: () => void;
};

function EditProfileDialog({ show, onClose }: EditProfileDialogProps) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<{
    originalName: string;
    serverFilename: string;
  } | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const [user, setUser] = useRecoilState(userState);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const updateProfileMutation = useMutation(
    (updatedUserValues: UpdateUserInput) =>
      updateUserProfile(updatedUserValues),
    {
      onSettled: () => {
        queryClient.invalidateQueries(GET_ALL_POSTS);
      },
    }
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setImage(user.image ?? null);
      setIsImageRemoved(false);
    }
  }, [user, show]);

  const handleUpdate = async () => {
    try {
      const profileData: UpdateUserInput = {
        name,
        bio,
      };

    if (!isImageRemoved && image !== null) {
      profileData.image = image;
    } else {
      profileData.image = undefined; 
    }

    const updatedProfile = await updateProfileMutation.mutateAsync(profileData);
    toast.success("Profile updated successfully");

    // Update user state with updated profile data
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedProfile.data.user,
      image: isImageRemoved ? null : image || prevUser.image,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);
    
    onClose();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

    const handleUpdateImageChange = async () => {
      if (inputFileRef.current) {
        inputFileRef.current.click();
      }
    };

    const handleRemoveImage = () => {
      setIsImageRemoved(true);
      setImage(null);
    };

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files?.[0];

      const maxSize = 10 * 1024 * 1024; // 10MB - adjust as needed
      if (selectedImage?.size && selectedImage.size > maxSize) {
        toast.error("Selected image exceeds the maximum file size allowed.");
        return;
      }

      if (!selectedImage) {
        // If no new image is selected, remove the existing image
        setIsImageRemoved(true);
        setImage(null);
        return;
      }    

      if (selectedImage) {
        const image = await uploadImage(selectedImage);
        setImage(image?.data);
      }
    };

    return (
      <Dialog show={show} onClose={onClose} title="Edit Profile">
        <div className="flex flex-col gap-3 pt-5">
          <div>
            <label
              htmlFor="edit-name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2"
            />
          </div>
          <div>
            <label
              htmlFor="edit-bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="mt-1 p-2 resize-none"
            />
          </div>
          <div>
            <label
              htmlFor="edit-image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <div className="flex items-center gap-2">
              <div className="input_image justify-between flex items-center rounded-sm">
                <button
                  className="btn_upload_image cursor-pointer"
                  onClick={handleUpdateImageChange}
                >
                  Choose File
                </button>
                <div>
                  <span className="text-base ml-1">
                    {truncateMiddle(
                      image?.originalName || "No file chosen",
                      27
                    )}
                  </span>
                </div>
                <XCircleIcon
                  onClick={handleRemoveImage}
                  width={20}
                  height={20}
                  className="ml-2 cursor-pointer"
                />
              </div>
              <input
                id="image"
                type="file"
                ref={inputFileRef}
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </Dialog>
    );
  }

export default EditProfileDialog;