import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="space-y-2">
      <CommentCard post={post} comment={comment} commentId={comment._id}>
        <div className="pl-5">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <button
              type="button"
              onClick={() => setNext(next + 10)}
              className="mt-2 text-sm font-semibold text-neutral-500 transition hover:text-white"
            >
              Load more...
            </button>
          ) : (
            replyCm.length > 1 && (
              <button
                type="button"
                onClick={() => setNext(1)}
                className="mt-2 text-sm font-semibold text-neutral-500 transition hover:text-white"
              >
                Hide...
              </button>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
