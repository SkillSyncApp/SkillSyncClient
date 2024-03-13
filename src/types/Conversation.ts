import { User } from "./User";

export type Conversation = {
  _id: string;
  users: User[];
  messagesBehind?: number;
};
