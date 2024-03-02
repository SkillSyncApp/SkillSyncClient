import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ConversationList from "../../components/inbox/conversation-list/ConversationList";
import ConversationChat from "../../components/inbox/conversationChat/ConversationChat";
import { GET_CONVERSATIONS, GET_MESSAGES } from "../../query-keys/queries";
import { getConversations, getMessages, sendMessage } from "../../services/chatService";
import { userState } from "../../store/atoms/userAtom";
import { Conversation } from "../../types/Conversation";
import { Message } from "../../types/Message";
import MessagesIcon from '../../assets/images/messages.png';

function Inbox() {
    const navigate = useNavigate();
    const { conversationId: selectedConversationId } = useParams();

    const user = useRecoilValue(userState);

    const queryClient = useQueryClient();
    const { data: conversationsData, isLoading: isConversationsLoading } = useQuery(GET_CONVERSATIONS, getConversations);
    const conversations: Conversation[] = conversationsData?.data || [];

    const { data: messagesData, isLoading: isMessagesLoading } = useQuery(
        [GET_MESSAGES, selectedConversationId],
        () => getMessages(selectedConversationId),
        { enabled: selectedConversationId !== undefined }
    );
    const selectedConversationMessages: Message[] = messagesData?.data || [];

    const sendMessageMutation = useMutation(sendMessage, {
        onSettled: () => {
            queryClient.invalidateQueries(GET_MESSAGES);
        }
    });

    const onConversationSelect = (conversationId: Conversation['_id']) => {
        navigate(`${conversationId}`);
    }

    const sendNewMessage = async (message: string) => {
        if (selectedConversationId && message !== '') {
            await sendMessageMutation.mutateAsync({
                content: message,
                userId: user._id,
                conversationId: selectedConversationId
            })
        }
    }

    return <div className="flex flex-1">
        <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onConversationSelect={onConversationSelect}
            loading={isConversationsLoading}
        />
        {selectedConversationId ?
            <ConversationChat messages={selectedConversationMessages} onNewMessage={sendNewMessage} loading={isMessagesLoading} /> :
            <div className="flex-1 flex flex-col items-center justify-center">
                <img src={MessagesIcon} className="h-[250px] drop-shadow-lg" />
                {
                    conversations.length === 0 ?
                        <>
                            <div className="font-bold opacity-60 text-md">no conversations yet</div>
                            <div className="opacity-60 text-sm">it's time to start contact with other users</div>
                        </> :
                        <>
                            <div className="font-bold opacity-60 text-md">no conversation was chosen</div>
                            <div className="opacity-60 text-sm">select a chat from the left pane</div>
                        </>
                }
            </div>
        }
    </div>
}

export default Inbox;