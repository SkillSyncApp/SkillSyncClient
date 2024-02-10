import {
    PencilIcon,
    ArrowLeftStartOnRectangleIcon as SignOutIconOutlined,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ProfileImage from "../../components/profile-image/ProfileImage";
import {
    logout as logoutRequest,
    resetTokens
} from "../../services/authService";
import { userState } from "../../store/atoms/userAtom";
import EditProfileDialog from "../../components/edit-profile-dialog/EditProfileDialog";

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
        <div className="flex-1 bg-lightgray flex flex-col items-center p-[70px] relative">
            <ProfileImage
                src={user.image || undefined}
                className="w-[200px] h-[200px] object-cover drop-shadow-lg"
            />
            <h2 className="pt-5 font-bold text-2xl">{user.name}</h2>
            <h4 className="opacity-60">{user.email}</h4>
            <p className="opacity-80 max-w-[400px] mt-5 text-[14px] text-center">
                {user.bio}
            </p>

            <button 
            onClick={handleEditClick} 
            className="absolute top-[50px] right-[50px] flex items-center gap-2 px-4 py-2 bg-lightgray text-gray">
                <PencilIcon width={18} />Edit Profile
            </button>

            {isEditFormOpen && (
                <EditProfileDialog
                    show={isEditFormOpen}
                    onClose={handleEditFormClose}
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
