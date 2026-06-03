import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from "moment";
import { deleteAllNotifies, isReadNotify } from "../redux/actions/notifyAction";

const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleDeleteAll = () => {
    const unread = notify.data.filter((item) => item.isRead === false);
    if (unread.length === 0) dispatch(deleteAllNotifies(auth.token));
  };

  return (
    <div className="w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl bg-[#121212] p-3">
      <div className="flex items-center justify-between px-1 py-2">
        <h5 className="m-0 text-base font-semibold text-white">Notifications</h5>
        <button className="text-sm font-semibold text-neutral-400 hover:text-white" onClick={handleDeleteAll}>
          Clear
        </button>
      </div>

      {notify.data.length === 0 && (
        <div className="py-10 text-center text-sm text-neutral-500">No notifications</div>
      )}

      <div className="max-h-[420px] overflow-auto">
        {notify.data.map((msg, index) => (
          <div className="mb-1 rounded-lg px-2 py-2 transition hover:bg-neutral-900" key={index}>
            <Link
              to={`${msg.url}`}
              className="flex items-center gap-3 text-white"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.avatar} size="big-avatar" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">
                  <strong className="mr-1">{msg.user.username}</strong>
                  <span className="text-neutral-300">{msg.text}</span>
                </div>
                {msg.content && (
                  <small className="block truncate text-neutral-500">{msg.content}</small>
                )}
              </div>
              {msg.image && <Avatar src={msg.image} size="medium-avatar" />}
            </Link>
            <small className="mt-1 flex justify-between px-1 text-xs text-neutral-500">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <i className="fas fa-circle text-[#4f5cff]" />}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotifyModal;
