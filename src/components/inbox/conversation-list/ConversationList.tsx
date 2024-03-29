import { ChatBubbleBottomCenterTextIcon as ChatIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/atoms/userAtom";
import { Conversation } from "../../../types/Conversation";
import "./ConversationList.css";

import ProfileImage from "../../profile-image/ProfileImage";
import "./ConversationList.css";

type ConversationListProps = {
    conversations: Conversation[];
    selectedConversationId: Conversation["_id"] | undefined;
    onConversationSelect: (conversationId: Conversation["_id"]) => void;
    onStartNewConversation: () => void;
    loading: boolean;
};

function ConversationList({
    conversations,
    selectedConversationId,
    onConversationSelect,
    onStartNewConversation,
    loading,
}: ConversationListProps) {
    const user = useRecoilValue(userState);

    const conversationRenderer = (conversation: Conversation) => {
        const conversationLead = conversation.users.find(
            (conversationUser) => conversationUser._id !== user._id
        );
        const conversationClass = classNames({
            "bg-lightgray": conversation._id === selectedConversationId,
        });

        return (
            <div
                key={conversation._id}
                className={`conversation-overview cursor-pointer hover:bg-lightgray pl-[20px] pr-[70px] py-[15px] flex items-center gap-2 ${conversationClass}`}
                onClick={() => onConversationSelect(conversation._id)}
            >
                <ProfileImage className="circle w-[40px] h-[40px]" src={conversationLead?.image?.serverFilename} />
                <h2>
                    {conversationLead?.name || "unknown"}
                    {(conversation.messagesBehind || 0) > 0 && (
                        <span className="rounded-full ml-2 bg-[#ff5252] text-white w-[20px] h-[20px] text-[12px] p-2">
                            {conversation.messagesBehind}
                        </span>
                    )}
                </h2>
            </div>
        );
    };

    const conversationsSkeletonRenderer = () => {
        const skeletonItems = Array.from({ length: 8 }, (_, i) => i + 120);

        const getRandomWidth = () => {
            return Math.min(140, Math.max(70, Math.floor(Math.random() * 140)));
        };

        return (
            <div className="animate-pulse">
                {skeletonItems.map((index) => (
                    <div
                        key={index}
                        className="conversation-overview cursor-pointer hover:bg-lightgray pl-[20px] pr-[70px] py-[15px] flex items-center gap-2"
                    >
                        <div className="circle w-[40px] h-[40px] bg-midgray flex-none" />
                        <div
                            className="h-[14px] bg-midgray rounded-lg"
                            style={{ width: getRandomWidth() }}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div
            className={`bg-white drop-shadow-lg z-10 flex flex-col ${loading || conversations.length !== 0 ? "w-[300px]" : ""
                }`}
        >
            {loading && conversationsSkeletonRenderer()}
            {!loading && conversations.length > 0 && (
                <div
                    className="p-3 flex gap-2 items-center justify-center bg-lightgray cursor-pointer"
                    style={{ borderBottom: "1px solid #c0c0c0" }}
                    onClick={onStartNewConversation}
                >
                    <ChatIcon className="w-[20px] h-[20px]" />
                    Start new conversation
                </div>
            )}
            <div className="conversation-container overflow-y-auto order rounded-lg flex-1">
                {conversations.map(conversationRenderer)}
            </div>
        </div>
    );
}

export default ConversationList;