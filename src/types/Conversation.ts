import { User } from "./User";

export type Conversation = {
  _id: string;
  // messages: Message[];
  users: User[];
};
