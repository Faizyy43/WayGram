import { GLOBALTYPES } from './globalTypes';
import { deleteDataAPI, emitSocket, getDataAPI, getErrorMessage, patchDataAPI, postDataAPI } from '../../utils/fetchData';

export const NOTIFY_TYPES = {
  GET_NOTIFIES: "GET_NOTIFIES",
  CREATE_NOTIFY: "CREATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  UPDATE_NOTIFY: "UPDATE_NOTIFY",
  UPDATE_SOUND: "UPDATE_SOUND",
  DELETE_ALL_NOTIFICATIONS: "DELETE_ALL_NOTIFICATIONS",
};

export const createNotify = ({msg, auth, socket }) => async (dispatch) => {

    try {
        const res = await postDataAPI(`notify`, msg, auth.token);
        emitSocket(socket, "createNotify", {
          ...res.data.notify,
          user: {
            username: auth.user.username,
            avatar: auth.user.avatar,
          }
        });
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: getErrorMessage(err)} })
    }
};

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);
    emitSocket(socket, "removeNotify", msg);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: getErrorMessage(err) },
    });
  }
};

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('notifies', token);
    
    dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies});
    
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: getErrorMessage(err) },
    });
  }
};

export const isReadNotify = ({msg, auth}) => async (dispatch) => {

  dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true} });

  try {
    await patchDataAPI(`isReadNotify/${msg._id}`,null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: getErrorMessage(err) },
    });
  }
};

export const deleteAllNotifies = (token) => async (dispatch) => {
  dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFICATIONS, payload: [] });

  try {
    await deleteDataAPI(`deleteAllNotify`, token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: getErrorMessage(err) },
    });
  }
};
