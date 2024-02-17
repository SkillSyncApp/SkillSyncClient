import { User } from "./User";

type CommentOwner = Pick<User, 'name' | 'type' | 'image' >;

export type Comment = {
    _id: string,
    userId: CommentOwner,
    content: string,
    createdAt: string
}