import { ConversationOverview } from "../../../types/ConversationOverview";
import './ConversationList.css';
import DefaultProfileImage from '../../../assets/images/profile-image.png';

type ConversationListProps = {
    conversations: ConversationOverview[];
    onConversationClick: (otherUserId: string) => void;
}

function ConversationList({ conversations, onConversationClick }: ConversationListProps) {    

    return <div className="bg-white drop-shadow-lg z-10">
        {conversations.map((conversation, index) =>
            <div key={`${conversation.sender.name} - ${index}`} onClick={() => onConversationClick(conversation.sender._id.toString())} className="conversation-overview cursor-pointer hover:bg-lightgray pl-[20px] pr-[70px] py-[15px] flex items-center gap-2">
                <img className="circle w-[40px] h-[40px]" src={conversation.sender.image || DefaultProfileImage} />
                <h2>{conversation.sender.name}</h2>
            </div>)
        }
    </div>
}

export default ConversationList;