import { ConversationOverview } from "../../../types/ConversationOverview";
import './ConversationList.css';
import DefaultProfileImage from '../../../assets/images/profile-image.png';

type ConversationListProps = {
    conversations: ConversationOverview[];
}

function ConversationList({ conversations }: ConversationListProps) {
    return <div className="bg-white drop-shadow-lg z-10">
        {conversations.map((conversation) =>
            <div key={conversation.sender.name} className="conversation-overview cursor-pointer hover:bg-lightgray pl-[20px] pr-[70px] py-[15px] flex items-center gap-2">
                <img className="circle w-[40px] h-[40px]" src={conversation.sender.image || DefaultProfileImage} />
                <h2>{conversation.sender.name}</h2>
            </div>)
        }
    </div>
}

export default ConversationList;