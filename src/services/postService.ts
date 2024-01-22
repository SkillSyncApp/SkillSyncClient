import { AxiosResponse } from "axios";
import { Post } from "../types/Post";
import { headers } from "./authService";
import apiClient from "./httpCommon";

export const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
    return await apiClient.get('/posts', { headers: headers() });
};