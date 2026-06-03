import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import { likeComment, unLikeComment, updateComment } from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;

    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false);
    }
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="space-y-2 py-1" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="flex items-center gap-3 text-slate-100" style={{ textDecoration: "none" }}>
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="text-sm font-semibold text-slate-100">{comment.user.username}</h6>
      </Link>

      <div className="space-y-3">
        <div className="min-w-0 flex-1">
          {onEdit ? (
              <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg bg-neutral-900 p-3 text-sm text-slate-100 outline-none"
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link
                  to={`/profile/${comment.tag._id}`}
                  className="mr-1 text-sm font-semibold text-[#6f7bff]"
                  style={{ textDecoration: "none" }}
                >
                  @{comment.tag.username}
                </Link>
              )}
              <span className="text-sm text-slate-200">
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "..."}
              </span>
              {content.length > 100 && (
                <button
                  type="button"
                  className="ml-2 text-sm font-semibold text-neutral-500 transition hover:text-white"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hide" : "Read more"}
                </button>
              )}
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span>{moment(comment.createdAt).fromNow()}</span>
            <button
              type="button"
              className="font-semibold text-neutral-400 transition hover:text-white"
              onClick={handleReply}
            >
              {onReply ? "cancel" : "reply"}
            </button>
            <span className="font-semibold text-neutral-400">{comment.likes.length} likes</span>
            {onEdit && (
              <>
                <button type="button" onClick={handleUpdate} className="font-semibold text-neutral-400 transition hover:text-white">
                  update
                </button>
                <button type="button" onClick={() => setOnEdit(false)} className="font-semibold text-neutral-400 transition hover:text-white">
                  cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-100">
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link
            to={`/profile/${onReply.user._id}`}
            className="mr-1 text-sm text-[#6f7bff]"
            style={{ textDecoration: "none" }}
          >
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
