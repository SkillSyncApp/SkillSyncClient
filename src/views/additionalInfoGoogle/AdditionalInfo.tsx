import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userState } from "../../store/atoms/userAtom";
import { useRecoilState } from "recoil";
import { useMutation, useQueryClient } from 'react-query';
import { UserType, UpdateUserGoogleInput } from '../../types/User'
import { updateUserBioType } from "../../services/authService";
import { GET_ALL_POSTS } from "../../query-keys/queries";

import "./AdditionalInfo.css";

function AdditionalInfo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedType, setSelectedType] = useState("student");
  const [bio, setBio] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const updateProfileMutation = useMutation((updatedUserValues: UpdateUserGoogleInput) =>
    updateUserBioType(updatedUserValues), {
        onSettled: () => {
            queryClient.invalidateQueries(GET_ALL_POSTS);
        }
    });

    useEffect(() => {
        setBio(user.bio);
        setSelectedType(user.type);
    }, [user]);

  const validateForm = () => {
    if (!bio) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

    const onFillAdditionalInfo = async () => {
        try {
            if (!validateForm()) {
                return;
            }
            const profileData: UpdateUserGoogleInput = {
                bio,
                type: selectedType as UserType
            };

        const updatedProfile = await updateProfileMutation.mutateAsync(profileData);
        toast.success("Profile updated successfully");

        setUser({ ...user, ...updatedProfile.data.user });
        navigate('/', { replace: true });

    } catch (error) {
        toast.error("Failed to update additional information");
    }
};

  return (
    <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
      <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
        <h1 className="text-2xl mb-3 font-bold">Additional Information</h1>
        <label htmlFor="type" className="block mb-2 text-sm text-gray-700"> 
            We would like to get more information about you before sign in with google
          </label>

        <div className="mb-3">
          <label htmlFor="type" className="block mb-2 text-sm text-gray-700">
            I'm a
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="student"
                checked={selectedType === "student" || selectedType == "unknown"}
                onChange={() => setSelectedType("student")}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="company"
                checked={selectedType === "company"}
                onChange={() => setSelectedType("company")}
              />
              Company
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="block mb-2 text-sm text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        <button onClick={onFillAdditionalInfo} className="mt-4 w-full">
          Register
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default AdditionalInfo;
