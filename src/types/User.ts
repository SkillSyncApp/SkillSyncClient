export type UserType = "company" | "student" | "unknown";

export type User = {
  _id: string;
  email: string;
  name: string;
  type: UserType;
  image?: string;
  bio: string;
};

export type UpdateUserInput = Pick<User, "name" | "bio" | "image">;

export type UpdateUserGoogleInput = Pick<User, "bio" | "type">;
