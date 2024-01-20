import { Message } from "../../../types/Message";
import MessageItem from "../message-item/MessageItem";

type ConversationProps = {
    messages: Message[];
}

function Conversation({ messages }: ConversationProps) {

    return <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 px-[30px] py-5 flex-1 overflow-scroll">
            {messages.map((message, index) =>
                <MessageItem message={message} style={{ alignSelf: message.sender.type === 'me' ? 'end' : 'start' }} key={`message-${message.sender.type}-${index}`} />)}
        </div>
        <div className="bg-white p-4 drop-shadow-lg">
            <input placeholder="Type a message here.."/>
        </div>
    </div>

}

export default Conversation;