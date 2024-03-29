import {
  ChatBubbleOvalLeftIcon as InboxIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { MouseEventHandler, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useConversationWith from "../../hooks/useConversationWith";
import { GET_USER_BY_ID } from "../../query-keys/queries";
import { getUserById } from "../../services/userService";
import { userState } from "../../store/atoms/userAtom";
import { User } from "../../types/User";
import ProfileImage from "../profile-image/ProfileImage";
import Dialog from "../shared/dialog/Dialog";

type UserOverviewProps = {
  id: User["_id"];
  name: string;
};

function UserOverview({ id, name }: UserOverviewProps) {
  const navigate = useNavigate();
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const currentUser = useRecoilValue(userState);

  const { startConversation } = useConversationWith(id);

  const { data: profileData } = useQuery(
    [GET_USER_BY_ID, id],
    () => getUserById(id),
    {
      enabled: showProfileDialog,
    }
  );

  const userData: User | undefined = profileData?.data;

  const openProfile: MouseEventHandler<HTMLHeadingElement> = (event) => {
    event.stopPropagation();

    if (currentUser._id !== userData?._id) {
      setShowProfileDialog(true);
    } else {
      navigate("profile");
    }

    return event;
  };

  const getFirstName = (user: User) => user.name.split(" ")[0];
  const goToChat = async () => {
    startConversation();
  };

  return (
    <>
      <h3
        className="font-bold text-lg hover:underline cursor-pointer"
        onClick={openProfile}
      >
        {name}
      </h3>
      {showProfileDialog && userData && (
        <Dialog
          show={showProfileDialog}
          onClose={() => setShowProfileDialog(false)}
          showHeader={false}
          title={`${getFirstName(userData)}'s Profile`}
        >
          <div className="flex flex-col pt-5 items-center">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowProfileDialog(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </div>
            <ProfileImage
              src={userData.image?.serverFilename}
              className="w-[100px] h-[100px] mb-4"
            />
            <div className="text-lg font-bold">{userData.name}</div>
            <div className="text-sm opacity-60">{userData.type}</div>
            <div className="text-sm opacity-60">{userData.email}</div>
            <div className="text-md opacity-80 mt-4 text-center">
              {userData.bio}
            </div>
            <button
              className="py-1 px-2 mt-3 mb-4 text-sm flex items-center gap-1 focus-visible:outline-none"
              onClick={goToChat}
            >
              <InboxIcon width={17} />
              Chat with {getFirstName(userData)}
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default UserOverview;
