import { Message } from "./Message";

export type Conversation = {
    _id: string;
    messages: Array<{ message: Message }>;
  };
  