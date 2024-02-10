import { AxiosResponse } from "axios";
import { UpdateUserInput, User } from "../types/User";
import apiClient from "./httpCommon";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const headers = () => {
  const tokens = getTokens();
  if (tokens.refreshToken) {
    return {
      Authorization: `Bearer ${tokens.refreshToken}`,
    };
  }
  return {};
};

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  return await apiClient.post("/auth/login", { email, password });
};

export const logout = async () => {
  return await apiClient.post("/auth/logout", {}, { headers: headers() });
};

type RegistrationResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  type: string,
  bio: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  return await apiClient.post("/auth/register", {
    name,
    email,
    password,
    type,
    bio,
  });
};

export const updateUserProfile = async (
  updatedUser: UpdateUserInput
): Promise<AxiosResponse<{ user: UpdateUserInput }>> => {
  return await apiClient.put("/auth/update-profile", updatedUser, {
    headers: headers(),
  });
};
