import React from "react";
import { useState } from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BASE_URL } from "../../../utils/config";

import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost, reportPost } from "../../../redux/actions/postAction";

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);

  const handleEditPost = () => {
    setOpenMenu(false);
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push("/");
    }
  };

  const handleReportPost = () => {
    setOpenMenu(false);
    dispatch(reportPost({ post, auth }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    setOpenMenu(false);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Post link copied." } });
  };

  return (
    <div className="flex items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-900 ring-2 ring-white/10">
          <Avatar src={post.user.avatar} size="big-avatar" />
        </div>
        <div>
          <h6 className="m-0 text-sm font-semibold text-slate-100">
            <Link className="text-slate-100 hover:text-neutral-400" to={`/profile/${post.user._id}`}>
              {post.user.username}
            </Link>
          </h6>
          <small className="text-xs text-slate-500">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenMenu(!openMenu)}
          className="grid h-10 w-10 place-items-center rounded-full text-slate-200 transition hover:bg-neutral-900"
          aria-label="Post options"
        >
        <span className="material-icons">
          more_horiz
        </span>
        </button>
        <div className={`${openMenu ? "block" : "hidden"} absolute right-0 z-50 mt-2 w-56 rounded-xl border border-neutral-800 bg-neutral-950 p-2 shadow-xl`}>
          {auth.user._id === post.user._id && (
            <>
              <button
                type="button"
                onClick={handleEditPost}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.07]"
              >
                <span className="material-icons text-violet-300">create</span>
                Edit Post
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-slate-100 transition hover:bg-neutral-900"
              >
                <span className="material-icons text-rose-400">delete</span>
                Delete Post
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.07]"
          >
            <span className="material-icons text-sky-300">content_copy</span>
            Copy Link
          </button>
          <button
            type="button"
            onClick={handleReportPost}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-slate-100 transition hover:bg-neutral-900"
          >
            <span className="material-icons text-amber-300">report_problem</span>
            Report this post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
