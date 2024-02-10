import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { GET_ALL_POSTS } from "../../query-keys/queries";
import { updateUserProfile } from "../../services/authService";
import { userState } from "../../store/atoms/userAtom";
import { UpdateUserInput } from "../../types/User";
import Dialog from "../shared/dialog/Dialog";

type EditProfileDialogProps = {
    show: boolean;
    onClose: () => void;
}

function EditProfileDialog({ show, onClose }: EditProfileDialogProps) {
    const queryClient = useQueryClient();

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState<string>("");

    const [user, setUser] = useRecoilState(userState);

    const updateProfileMutation = useMutation((updatedUserValues: UpdateUserInput) =>
        updateUserProfile(updatedUserValues), {
        onSettled: () => {
            queryClient.invalidateQueries(GET_ALL_POSTS);
        }
    });

    useEffect(() => {
        setName(user.name);
        setBio(user.bio);
        setImage(user.image || "");
    }, [user]);

    const handleUpdate = async () => {
        try {
            const profileData: UpdateUserInput = {
                name,
                bio,
            };

            profileData.image = image || "";

            const updatedProfile = await updateProfileMutation.mutateAsync(profileData);
            toast.success("Profile updated successfully");

            setUser({ ...user, ...updatedProfile.data.user });

            onClose();
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    //TODO : server cant save large pictures -> need to Increase Server's Payload Limit ?
    const handleImageChange: React.ChangeEventHandler<HTMLInputElement>  = (e) => {
        const selectedImage = e.target.files?.[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string); // Convert to base64 string
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <Dialog show={show} onClose={onClose} title='Edit Profile'>
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
                    <input
                        type="file"
                        id="edit-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 p-2"
                    />
                </div>
                <button
                    onClick={handleUpdate}
                >
                    Update Profile
                </button>
            </div>
        </Dialog>
    );
}

export default EditProfileDialog;