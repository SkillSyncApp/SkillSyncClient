import { AxiosResponse } from "axios";
import { headers } from "./authService";
import { Message } from "../types/Message";
import apiClient from "./httpCommon";

export const addMessage = async (
    receiverId: string,
    message: string
    ): Promise<AxiosResponse<Message>> => {
    return await apiClient.post(`/chat/sendMessage/${receiverId}`, { message }, { headers: headers() });
};

// export const listMessages = async (
//     receiverId: Message['sender'],
//     message: string
//     ): Promise<AxiosResponse<Message[]>> => {
//     return await apiClient.post(`/chat/listMessages/${receiverId}`, { message }, { headers: headers() });
// };