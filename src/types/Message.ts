import { User } from "./User";

export type Message = {
    _id: String,
    sender: {
        info: MessageSender,
        name: string;
        image?: string; // Image is optional
    }
    content: string;
}

type MessageSender = Pick<User, '_id' >;
