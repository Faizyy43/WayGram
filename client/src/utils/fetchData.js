import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const getConfig = (token) => ({
  headers: token ? { Authorization: token } : undefined,
});

export const getDataAPI = (url, token) => api.get(url, getConfig(token));
export const postDataAPI = (url, payload, token) => api.post(url, payload, getConfig(token));
export const putDataAPI = (url, payload, token) => api.put(url, payload, getConfig(token));
export const patchDataAPI = (url, payload, token) => api.patch(url, payload, getConfig(token));
export const deleteDataAPI = (url, token) => api.delete(url, getConfig(token));

export const getErrorMessage = (err) =>
  err?.response?.data?.msg || err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";

export const emitSocket = (socket, eventName, payload) => {
  if (socket?.emit) {
    socket.emit(eventName, payload);
  }
};
