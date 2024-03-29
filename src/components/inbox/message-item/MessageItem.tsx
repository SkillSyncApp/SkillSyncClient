import { CSSProperties } from 'react';
import { Message } from '../../../types/Message';
import './MessageItem.css';
import { userState } from "../../../store/atoms/userAtom";
import { useRecoilValue } from 'recoil';
import { formattedDate, isToday } from '../../../utils/dates';

type MessageProp = {
    message: Message;
    style?: CSSProperties;
}

function MessageItem({ message, style }: MessageProp) {
    const user = useRecoilValue(userState);

    const messageClass = user._id == message.sender._id ? 'me' : 'other';

    const createdAt = formattedDate(message.createdAt, !isToday(message.createdAt));

    return <div className={`message-wrapper flex drop-shadow-md items-center relative ${messageClass}`} style={style}>
        <div className="message flex flex-col rounded-lg py-3 px-4">
            <div className="font-bold">{message.sender.name}</div>
            <p className="opacity-70 text-md">{message.content}</p>
            <p className='opacity-50 text-xs mt-1 ml-auto'>{createdAt}</p>
        </div>
    </div>
}

export default MessageItem;