import { CSSProperties } from 'react';
import { Message } from '../../../types/Message';
import './MessageItem.css';

type MessageProp = {
    message: Message;
    style?: CSSProperties;
}

function MessageItem({ message, style }: MessageProp) {
    return <div className={`message-wrapper flex drop-shadow-md items-center relative ${message.sender.type}`} style={style}>
        <div className="message flex flex-col rounded-lg py-3 px-4">
            <div className="font-bold">{message.sender.name}</div>
            <p className="opacity-70 text-sm">{message.content}</p>
        </div>
    </div>
}

export default MessageItem;