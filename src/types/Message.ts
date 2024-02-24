import { Conversation } from "./Conversation";
import { User } from "./User";

export type Message = {
    _id: string,
    sender: MessageSender,
    content: string;
    createdAt: Date;
}

type MessageSender = Pick<User, '_id' | 'name' | 'image'>;

export type SendMessageInput =
    Pick<Message, "content"> & { userId: User['_id'], conversationId: Conversation['_id'] };