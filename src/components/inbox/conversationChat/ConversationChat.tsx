import { Message } from "../../../types/Message";
import MessageItem from "../message-item/MessageItem";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/atoms/userAtom";
import { useState } from "react";

type ConversationChatProps = {
    messages: Message[];
    onNewMessage: (message: string) => void;
}

function ConversationChat({ messages, onNewMessage }: ConversationChatProps) {
    const user = useRecoilValue(userState);

    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewMessage(event.target.value);
    }

    const submitMessage = () => {
        onNewMessage(newMessage);
        setNewMessage('');
    }

    return <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-5 px-[30px] py-5 flex-1 overflow-scroll">
            {messages.map((message, index) => (
                <MessageItem message={message} style={{ alignSelf: message.sender._id === user._id ? 'end' : 'start' }} key={`message-${message.sender._id}-${index}`} />
            ))}
        </div>
        <div className="bg-white p-4 drop-shadow-lg">
            <input placeholder="Type a message here.."
                value={newMessage}
                onChange={handleNewMessageChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitMessage()
                    }
                }}
            />
        </div>
    </div>

}

export default ConversationChat;