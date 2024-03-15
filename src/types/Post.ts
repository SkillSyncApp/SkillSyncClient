import { User } from "./User";

type PostOwner = Pick<User, "_id" | "name" | "type" | "image">;

export type Post = {
  _id: string;
  ownerId: PostOwner;
  title: string;
  content: string;
  image?: { originalName: string; serverFilename: string };
  commentsCount: number;
};

export type CreatePostInput = Pick<Post, "title" | "content" | "image">;

export type UpdatePostInput = {
  title?: string;
  content?: string;
  image?: { originalName: string; serverFilename: string };
};
