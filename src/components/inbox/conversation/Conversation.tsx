import { Message } from "../../../types/Message";
import MessageItem from "../message-item/MessageItem";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/atoms/userAtom";

type ConversationProps = {
    messages: Message[];
}

function Conversation({ messages }: ConversationProps) {
    const user = useRecoilValue(userState);

    return <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-5 px-[30px] py-5 flex-1 overflow-scroll">
            {messages.map((message, index) => (
             <MessageItem message={message} style={{ alignSelf: message.sender._id === user._id ? 'end' : 'start' }} key={`message-${message.sender._id}-${index}`} />
             ))}
        </div>
        <div className="bg-white p-4 drop-shadow-lg">
            <input placeholder="Type a message here.."/>
        </div>
    </div>

}

export default Conversation;