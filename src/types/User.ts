export type UserType = 'company' | 'student';

export type User = {
    _id: string;
    email: string;
    name: string;
    type: UserType;
    image?: string;
    bio: string;
};

export type UpdateUserInput = Pick<User, 'name' | 'bio' | 'image'>;