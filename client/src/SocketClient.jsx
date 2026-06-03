import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { ADMIN_TYPES } from "./redux/actions/adminAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";
import { MESSAGE_TYPES } from "./redux/actions/messageAction";

import audioTone from './audio/pristine-609.mp3' 

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body, icon
  }
  let n = new Notification(title, options);
  n.onclick =  e => {
    e.preventDefault();
    window.open(url, '_blank');
  }
}

const SocketClient = () => {
  const { auth, socket, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const audioRef = useRef();
  const isSocketReady =
    socket && typeof socket.emit === "function" && typeof socket.on === "function";

  //!connection
  useEffect(() => {
    if (!isSocketReady || !auth.user?._id) return;

    if (auth.user.role === "user") {
      socket.emit("joinUser", auth.user._id);
    } else if (auth.user.role === "admin") {
      socket.emit("joinAdmin", auth.user._id);
    }
  }, [socket, isSocketReady, auth.user?.role, auth.user?._id]);

  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("getActiveUsersToClient", (totalActiveUsers) => {
      dispatch({
        type: ADMIN_TYPES.GET_TOTAL_ACTIVE_USERS,
        payload: totalActiveUsers,
      });
    });
    return () => socket.off("getActiveUsersToClient");
  }, [socket, isSocketReady, dispatch]);

  //!like Post
  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likeToClient");
  }, [socket, isSocketReady, dispatch]);

  //!Unlike Post
  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unLikeToClient");
  }, [socket, isSocketReady, dispatch]);

  //!Comments
  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("createCommentToClient");
  }, [socket, isSocketReady, dispatch]);

  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("deleteCommentToClient");
  }, [socket, isSocketReady, dispatch]);

  //!Follow
  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("followToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });
    return () => socket.off("followToClient");
  }, [socket, isSocketReady, dispatch, auth]);

  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("unFollowToClient", (newUser) => {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });
    return () => socket.off("unFollowToClient");
  }, [socket, isSocketReady, dispatch, auth]);

  //!Notifications
  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("createNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });

      if (notify.sound) {
        audioRef.current.play();
      }
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "WAYGRAM"
      );
    });
    return () => socket.off("createNotifyToClient");
  }, [socket, isSocketReady, dispatch, notify.sound]);

  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("removeNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });
    return () => socket.off("removeNotifyToClient");
  }, [socket, isSocketReady, dispatch]);

  //!Messages
  useEffect(() => {
    if (!isSocketReady) return;

    socket.on("addMessageToClient", (msg) => {
      dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });

    });
    return () => socket.off("addMessageToClient");
  }, [socket, isSocketReady, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioTone} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
