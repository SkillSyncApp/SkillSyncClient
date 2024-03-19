import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_ALL_POSTS } from "../../query-keys/queries";
import { updateUserBioType } from "../../services/authService";
import { userState } from "../../store/atoms/userAtom";
import { UpdateUserGoogleInput, UserType } from "../../types/User";

import "./AdditionalInfo.css";

function AdditionalInfo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedType, setSelectedType] = useState("student");
  const [user, setUser] = useRecoilState(userState);
  const [bio, setBio] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipContent = "Bio must be at least 5 characters long";

  const updateProfileMutation = useMutation(
    (updatedUserValues: UpdateUserGoogleInput) =>
      updateUserBioType(updatedUserValues),
    {
      onSettled: () => {
        queryClient.invalidateQueries(GET_ALL_POSTS);
      },
    }
  );

  // useEffect(()=>{
  //   if(!user) navigate("/login")
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[user])

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
        type: selectedType as UserType,
      };

      const updatedProfile = await updateProfileMutation.mutateAsync(
        profileData
      );
      toast.success("Profile updated successfully");

      setBio(user.bio);
      setSelectedType(user.type);

      setUser({ ...user, ...updatedProfile.data.user });
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Failed to update additional information");
    }
  };

  return (
    <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
      <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
        <h1 className="text-2xl mb-3 font-bold">Additional Information</h1>
        <label htmlFor="type" className="block mb-2 text-sm text-gray-700">
          We would like to get more information about you before sign in with
          google
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
                checked={
                  selectedType === "student" || selectedType == "unknown"
                }
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
        <div className="mb-3 flex items-center">
          <label htmlFor="bio" className="block text-sm text-gray-700">
            Bio
            <span className="text-red-500">*</span>
          </label>
          <div
            className="text-gray-500 cursor-help relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ cursor: "default" }}
          >
            {showTooltip && (
              <div className="absolute bottom-[30px] w-[265px] bg-white border border-gray-200 text-sm p-2 rounded shadow-lg">
                {tooltipContent}
              </div>
            )}
            <QuestionMarkCircleIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="mb-3 flex items-center">
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
