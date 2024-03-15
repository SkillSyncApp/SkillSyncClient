import { AxiosResponse } from "axios";
import { ImageUploadResponse } from "../types/ImageUpload";
import { headers } from "./authService";
import apiClient from "./httpCommon";

export const uploadImage = async (
  photo: File
): Promise<AxiosResponse<ImageUploadResponse>> => {
  const formData = new FormData();
  formData.append("file", photo);
  return await apiClient.post(`/file/image`, formData, {
    headers: {
      ...headers(),
      "Content-Type": "multipart/form-data",
    },
  });
};
