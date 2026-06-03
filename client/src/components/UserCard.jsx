import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  return (
    <div className={`flex min-w-0 items-center justify-between gap-3 rounded-lg p-2 transition hover:bg-neutral-900 ${border ? "border border-neutral-800" : ""}`}>
      <Link
        to={`/profile/${user._id}`}
        onClick={handleCloseAll}
        className="flex min-w-0 items-center gap-3 text-slate-100"
        style={{ textDecoration: "none" }}
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-900">
          <Avatar src={user.avatar} size="big-avatar" />
        </div>
        <div className="min-w-0">
          <span className="block max-w-[190px] truncate text-sm font-bold text-white">{user.username}</span>
          <small className="block max-w-[190px] truncate text-xs text-slate-400">
            {msg ? (
              <>
                <div>{user.text}</div>
                {user.media?.length > 0 && <div>{user.media.length} image(s)</div>}
              </>
            ) : (
              user.fullname
            )}
          </small>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default UserCard;
