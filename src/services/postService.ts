import { AxiosResponse } from "axios";
import { CreatePostInput, Post } from "../types/Post";
import { headers } from "./authService";
import apiClient from "./httpCommon";

export const addPost = async (
  post: CreatePostInput
): Promise<AxiosResponse<Post>> => {
  return await apiClient.post("/posts", post, { headers: headers() });
};

export const deletePost = async (
  postId: Post["_id"]
): Promise<AxiosResponse<void>> => {
  return await apiClient.delete(`/posts/${postId}`, { headers: headers() });
};

export const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
  return await apiClient.get("/posts", { headers: headers() });
};

export const updatePost = async (
  postId: Post["_id"],
  updatedPost: UpdatePostInput
): Promise<AxiosResponse<Post>> => {
  return await apiClient.put(`/posts/${postId}`, updatedPost, {
    headers: headers(),
  });
};
