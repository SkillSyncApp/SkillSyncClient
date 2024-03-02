import { useRecoilValue } from 'recoil';
import DefaultProfileImage from '../../../assets/images/profile-image.png';
import { Conversation } from "../../../types/Conversation";
import './ConversationList.css';
import { userState } from '../../../store/atoms/userAtom';
import classNames from 'classnames';

type ConversationListProps = {
    conversations: Conversation[];
    selectedConversationId: Conversation['_id'] | undefined;
    onConversationSelect: (conversationId: Conversation['_id']) => void;
    loading: boolean;
}

function ConversationList({ conversations, selectedConversationId, onConversationSelect, loading }: ConversationListProps) {
    const user = useRecoilValue(userState);

    const conversationRenderer = (conversation: Conversation) => {
        const conversationLead = conversation.users.find(conversationUser => conversationUser._id !== user._id);
        const conversationClass = classNames({
            'bg-lightgray': conversation._id === selectedConversationId
        })

        return <div
            key={conversation._id}
            className={`conversation-overview cursor-pointer hover:bg-lightgray pl-[20px] pr-[70px] py-[15px] flex items-center gap-2 ${conversationClass}`}
            onClick={() => onConversationSelect(conversation._id)}
        >
            <img className="circle w-[40px] h-[40px]" src={conversationLead?.image || DefaultProfileImage} />
            <h2>{conversationLead?.name || 'unknown'}</h2>
        </div>
    }

    const conversationsSkeletonRenderer = () => {
        const skeletonItems = Array.from({ length: 8 }, (_, i) => i + 120);

        const getRandomWidth = () => {
            return Math.min(140, Math.max(70, Math.floor(Math.random() * 140)))
        }

        return <div className='animate-pulse'>
            {skeletonItems.map((index) => <div
                key={index}
                className="conversation-overview cursor-pointer hover:bg-lightgray pl-[20px] pr-[70px] py-[15px] flex items-center gap-2"
            >
                <div className="circle w-[40px] h-[40px] bg-midgray flex-none"/>
                <div className="h-[14px] bg-midgray rounded-lg" style={{ width: getRandomWidth() }}/>
            </div>)}
        </div>
    }

    return <div className={`bg-white drop-shadow-lg z-10 ${loading || conversations.length !== 0 ? 'w-[250px]' : ''}`}>
        {loading && conversationsSkeletonRenderer()}
        {conversations.map(conversationRenderer)}
    </div>
}

export default ConversationList;