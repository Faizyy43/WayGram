import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newReply = post.comments.filter((cm) => cm.reply);
    setReplyComments(newReply);
  }, [post.comments]);

  return (
    <div className="space-y-3 pb-3">
      {showComments.map((comment, index) => (
        <CommentDisplay
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}
      {comments.length - next > 0 ? (
        <div
          onClick={() => setNext(next + 10)}
          className="cursor-pointer text-sm text-neutral-500 transition hover:text-white"
        >
          Load more...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            onClick={() => setNext(2)}
            className="cursor-pointer text-sm text-neutral-500 transition hover:text-white"
          >
            Hide...
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
