import apiClient from "./httpCommon";

export const login = async (email: string, password: string) => {
    return await apiClient.post('/auth/login', { email, password });
};

export const logout = async () => {
    return await apiClient.post('/auth/logout', {}, { headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFiZGNlZmYxYmU4YTU5ZDlkNzMwNzAiLCJpYXQiOjE3MDU3NjM4NDh9.VA4KK2_H1TTi2bX-qqN42pLnunBoAzhtB2eN8rL4Hcw"
    }});
};