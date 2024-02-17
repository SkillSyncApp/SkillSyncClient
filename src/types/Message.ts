import { User } from "./User";

export type Message = {
    _id: String,
    sender: MessageSender,
    content: string;
}

type MessageSender = Pick<User, '_id' | 'name' | 'image' >;
