import { AxiosResponse } from "axios";
import { headers } from "./authService";
import apiClient from "./httpCommon";
import { ConversationOverview } from "../types/ConversationOverview";
import { Message } from "../types/Message";

export const getConversationsOverView = async (): Promise<AxiosResponse<ConversationOverview[]>> => {
    return await apiClient.get(`/chat/conversationOverView`, { headers: headers() });
};

export const getConversationMessages = async (receiverId: String): Promise<AxiosResponse<Message[]>> => {
    return await apiClient.get(`/chat/messages/${receiverId}`, { headers: headers() });
};

export const addConversation = async (receiverId: String): Promise<AxiosResponse<ConversationOverview[]>> => {
    return await apiClient.post(`/chat/addConversation/${receiverId}`, { headers: headers() });
};
