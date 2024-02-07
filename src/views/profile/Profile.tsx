import { useEffect, useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon as SignOutIconOutlined,
  PencilIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ProfileImage from "../../components/profile-image/ProfileImage";
import {
  logout as logoutRequest,
  resetTokens,
  updateUserProfile,
} from "../../services/authService";
import { userState } from "../../store/atoms/userAtom";

function EditForm({ onClose, onUpdate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | "">("");

  const user = useRecoilValue(userState);
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio);
    setImage(user.image || "");
  }, [user]);

  const handleUpdate = async () => {
    try {
      let profileData: {
        name: string;
        email: string;
        bio: string;
        image?: string | "";
      } = {
        name,
        email,
        bio,
      };

      if (image) {
        profileData.image = image;
      } else {
        profileData.image = "";
      }

      await updateUserProfile(profileData);

      onClose();
      onUpdate(); // Trigger the callback to update the profile
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
  //TODO : server cant save large pictures -> need to Increase Server's Payload Limit ?
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Convert to base64 string
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <div className="mb-4">
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
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="edit-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
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
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
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
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const resetUserState = useResetRecoilState(userState);

  const logoutMutation = useMutation(logoutRequest);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
  };

  const handleProfileUpdate = () => {
    resetUserState(); // Reset the user state to fetch updated data
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      resetTokens();
      resetUserState();
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Failed to sign out");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 bg-lightgray flex flex-col items-center p-[70px]">
      <ProfileImage
        src={user.image || undefined}
        className="w-[200px] h-[200px] object-cover drop-shadow-lg"
      />
      <h2 className="pt-5 font-bold text-2xl">{user.name}</h2>
      <h4 className="opacity-60">{user.email}</h4>
      <p className="opacity-80 max-w-[400px] mt-5 text-[14px] text-center">
        {user.bio}
      </p>

      <div
        onClick={handleEditClick}
        className="cursor-pointer absolute top-8 right-8"
      >
        <PencilIcon width={24} />
      </div>

      {isEditFormOpen && (
        <EditForm
          onClose={handleEditFormClose}
          onUpdate={handleProfileUpdate}
        />
      )}

      <div
        onClick={logout}
        className="mt-auto flex gap-1 items-center text-[#d9455c] cursor-pointer transition"
      >
        <SignOutIconOutlined width={18} />
        Sign out
      </div>
    </div>
  );
}

export default Profile;
