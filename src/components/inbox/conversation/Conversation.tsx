import { Message } from "../../../types/Message";
import MessageItem from "../message-item/MessageItem";
import { useRecoilValue } from "recoil";
import { userIdSelector } from "../../../store/atoms/userAtom";
import { useState, useRef, ChangeEvent } from "react";
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { GET_CONVERSATION_MESSAGES } from "../../../query-keys/queries";
import { addMessage } from '../../../services/ChatService'
import { io } from 'socket.io-client';

type ConversationProps = {
    messages: Message[];
    recieverId: string;
}

function Conversation({ messages, recieverId }: ConversationProps) {
    const [newMessage, setNewMessage] = useState("");
    const userId = useRecoilValue(userIdSelector);
    const socket = io('ws://localhost:3002'); //TODO ENV

    const inputRef = useRef<HTMLInputElement>(null);
    const messagesWrapperRef = useRef<HTMLDivElement>(null);

    const queryClient = useQueryClient();

    const addMessageMutation = useMutation(({ message }: { message: string }) =>
    addMessage(recieverId, message),{
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [GET_CONVERSATION_MESSAGES] });
        }
    })
    const addNewMessage = async () => {
        if (newMessage !== "") {
            try {
                await addMessageMutation.mutateAsync({ message: newMessage });
                socket.emit('sendMessage', { receiverId: recieverId, message: newMessage });

                setNewMessage("");

                setTimeout(() => {
                    scrollToBottomOfChat();
                }, 500);
            } catch (err) {
                toast.error('Failed to send message. Please try again');
            }
        }
    }

    const scrollToBottomOfChat = () => {
        const lastMessageElement = messagesWrapperRef.current?.lastElementChild?.lastElementChild;
        lastMessageElement?.scrollIntoView({ behavior: 'smooth' });
    }

      const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
        console.log(event.target.value)
      };

    return <div className="flex-1 flex flex-col overflow-hidden" ref={messagesWrapperRef}>
        <div className="flex flex-col gap-5 px-[30px] py-5 flex-1 overflow-scroll">
            {messages.map((message, index) => (
             <MessageItem message={message} style={{ alignSelf: message.sender._id === userId ? 'end' : 'start' }} key={`message-${message.sender._id}-${index}`} />
             ))}
        </div>
        <div className="bg-white p-6 drop-shadow-lg flex items-center">
                <input
                    placeholder="Type a message here.."
                    value={newMessage}
                    onChange={handleMessageChange}
                    ref={inputRef}
                    className="mr-2"
                />

                <button
                    onClick={addNewMessage}
                    className={`px-4 py-2 bg-lightgray text-primary !shadow-none`}>
                    Send
                </button>
            </div>
    </div>

}

export default Conversation;