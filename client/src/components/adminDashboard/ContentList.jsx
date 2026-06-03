import React from "react";
import Avatar from "../Avatar";
import { deleteSpamPost } from "../../redux/actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ContentList = ({ content }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeletePost = (post) => {
    dispatch(deleteSpamPost({ post, auth, socket }));
  };

  if (content.length === 0) {
    return (
      <div className="grid min-h-[220px] place-items-center rounded-3xl border border-dashed border-slate-700/70 text-center">
        <h1 className="text-lg font-extrabold text-slate-300">Nothing to display</h1>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {content.map((post) => (
        <div
          key={post._id}
          className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-4"
        >
          <span className="rounded-full bg-rose-500/15 px-3 py-1 text-sm font-bold text-rose-300">
            Reports: {post.reports.length}
          </span>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Avatar size="big-avatar" src={post.user.avatar} />
            <div className="min-w-0">
              <span className="block truncate text-sm font-bold text-white">{post.user.username}</span>
              <span className="block truncate text-xs text-slate-400">{post.user.email}</span>
            </div>
            <span className="ml-auto text-xs text-slate-500">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-4 py-2 text-sm font-bold text-rose-300 transition hover:bg-rose-500/25"
            onClick={() => handleDeletePost(post)}
          >
            <span className="material-icons text-base">delete</span>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
