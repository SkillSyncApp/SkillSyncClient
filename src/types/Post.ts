import { User } from "./User";

type PostOwner = Pick<User, 'name' | 'type' | 'image' >;

export type Post = {
    _id: string,
    ownerId: PostOwner,
    title: string,
    content: string,
    image?: string,
    commentsCount: number
}

export type CreatePostInput = Pick<Post, 'title' | 'content' | 'image'>;