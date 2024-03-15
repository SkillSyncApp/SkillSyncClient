import { AxiosResponse } from "axios";
import { User } from "../types/User";
import { headers } from "./authService";
import apiClient from "./httpCommon";

export const getUserById = async (
  userId: User["_id"]
): Promise<AxiosResponse<User>> => {
  return await apiClient.get(`/users/${userId}`, { headers: headers() });
};
