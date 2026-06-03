import axios from 'axios';

const getConfig = (token) => ({
  headers: { Authorization: token },
  withCredentials: true,
});

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, getConfig(token));
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, getConfig(token));
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, getConfig(token));
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, getConfig(token));
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, getConfig(token));
  return res;
};

export const getErrorMessage = (err) => {
  return (
    err?.response?.data?.msg ||
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong. Please try again."
  );
};

export const emitSocket = (socket, eventName, payload) => {
  if (socket && typeof socket.emit === "function") {
    socket.emit(eventName, payload);
  }
};
