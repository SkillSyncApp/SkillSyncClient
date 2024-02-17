import { AxiosResponse } from "axios";
import { headers } from "./authService";
import apiClient from "./httpCommon";
import { ConversationOverview } from "../types/ConversationOverview";

export const getConversations = async (): Promise<AxiosResponse<ConversationOverview[]>> => {
    return await apiClient.get(`/chat/conversations`, { headers: headers() });
};

export const addConversations = async (receiverId: String): Promise<AxiosResponse<ConversationOverview[]>> => {
    return await apiClient.post(`/chat/addConversation/${receiverId}`, { headers: headers() });
};
