import { AxiosResponse } from "axios";
import { Post } from "../types/Post";
import { headers } from "./authService";
import { Comment } from "../types/Comment";
import apiClient from "./httpCommon";
import { User } from "../types/User";

export const getComments = async (postId: Post['_id'] | undefined): Promise<AxiosResponse<Comment[]>> => {
    return await apiClient.get(`/posts/comments/${postId}`, { headers: headers() });
};

export const addComment = async (userId: User['_id'], postId: Post['_id'] | undefined, content: string): Promise<AxiosResponse<Comment>> => {
    return await apiClient.post(`/comments/${postId}`, { content, userId }, { headers: headers() });
};