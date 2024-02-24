import { AxiosResponse } from "axios";
import { Conversation } from "../types/Conversation";
import { Message, SendMessageInput } from "../types/Message";
import { headers } from "./authService";
import apiClient from "./httpCommon";

export const getConversations = async (): Promise<AxiosResponse<Conversation[]>> => {
    return await apiClient.get(`/chat/conversation`, { headers: headers() });
};

export const getMessages = async (conversationId: Conversation['_id'] | undefined): Promise<AxiosResponse<Message[]>> => {
    return await apiClient.get(`/chat/conversation/${conversationId}/messages`, { headers: headers() });
};

export const sendMessage = async ({ conversationId, content, userId }: SendMessageInput): Promise<AxiosResponse<void>> => {
    return await apiClient.post(`/chat/conversation/${conversationId}/messages`, { userId, content }, { headers: headers() });
};