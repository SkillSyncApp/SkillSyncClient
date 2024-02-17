import { AxiosResponse } from "axios";
import { headers } from "./authService";
import { Message } from "../types/Message";
import apiClient from "./httpCommon";

// export const addMessage = async (
//     receiverId: Message['sender..'],
//     message: string
//     ): Promise<AxiosResponse<Message[]>> => {
//     return await apiClient.post(`/chat/send_message/${receiverId}`, { message }, { headers: headers() });
// };