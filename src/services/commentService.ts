import { AxiosResponse } from "axios";
import { Post } from "../types/Post";
import { headers } from "./authService";
import { Comment } from "../types/Comment";
import apiClient from "./httpCommon";

export const getComments = async (postId: Post['_id'] | undefined): Promise<AxiosResponse<Comment[]>> => {
    return await apiClient.get(`/posts/comments/${postId}`, { headers: headers() });
};