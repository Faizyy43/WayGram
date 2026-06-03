import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import Icons from "../Icons";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) {
        return setOnReply(false);
      }
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) {
      return setOnReply(false);
    }
  };

  return (
    <form
      className="flex flex-wrap items-center gap-3 border-t border-neutral-800 py-3"
      onSubmit={handleSubmit}
    >
      {children}
      <input
        type="text"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-w-[0] flex-1 bg-transparent py-2 text-sm text-slate-100 outline-none placeholder:text-neutral-500"
      />
      <Icons setContent={setContent} content={content} theme={theme} />
      <button
        type="submit"
        className="text-sm font-semibold text-sky-400 transition hover:text-white"
      >
        Post
      </button>
    </form>
  );
};

export default InputComment;
