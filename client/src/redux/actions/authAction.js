import { getErrorMessage, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import valid from "../../utils/valid";

const authSuccess = (dispatch, { access_token, user, msg }) => {
  dispatch({ type: GLOBALTYPES.AUTH, payload: { token: access_token, user } });
  dispatch({ type: GLOBALTYPES.USER_TYPE, payload: user.role });
  localStorage.setItem("firstLogin", true);
  dispatch({ type: GLOBALTYPES.ALERT, payload: { success: msg } });
};

const handleRequest = async (dispatch, url, payload, authToken) => {
  dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  const response = await postDataAPI(url, payload, authToken);
  dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
  return response.data;
};

const validatePasswordUpdate = ({ oldPassword, newPassword, cnfNewPassword }) => {
  if (!oldPassword) return "Please enter your old password.";
  if (!newPassword) return "Please enter your new password.";
  if (!cnfNewPassword) return "Please confirm your new password.";
  if (newPassword !== cnfNewPassword) return "New passwords do not match.";
  if (newPassword.length < 6) return "Password must be at least 6 characters long.";
  return null;
};

export const login = (data) => async (dispatch) => {
  try {
    const response = await handleRequest(dispatch, "login", data);
    authSuccess(dispatch, response);
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
  }
};

export const changePassword = ({ oldPassword, newPassword, cnfNewPassword, auth }) => async (dispatch) => {
  const error = validatePasswordUpdate({ oldPassword, newPassword, cnfNewPassword });
  if (error) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error } });

  try {
    const response = await handleRequest(dispatch, "changePassword", { oldPassword, newPassword }, auth.token);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: response.msg } });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
  }
};

export const adminLogin = (data) => async (dispatch) => {
  try {
    const response = await handleRequest(dispatch, "admin_login", data);
    authSuccess(dispatch, response);
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (!firstLogin) return;

  dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  try {
    const response = await postDataAPI("refresh_token");
    dispatch({ type: GLOBALTYPES.AUTH, payload: { token: response.data.access_token, user: response.data.user } });
    dispatch({ type: GLOBALTYPES.USER_TYPE, payload: response.data.user.role });
  } catch (err) {
    localStorage.removeItem("firstLogin");
    dispatch({ type: GLOBALTYPES.AUTH, payload: {} });
  } finally {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
  }
};

export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }

  try {
    const response = await handleRequest(dispatch, "register", data);
    authSuccess(dispatch, response);
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
  }
};

export const registerAdmin = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const response = await postDataAPI("register_admin", data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: response.data.msg } });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
  }
};
