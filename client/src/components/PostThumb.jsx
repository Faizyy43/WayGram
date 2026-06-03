import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostThumb = ({
  posts,
  result,
  emptyIcon = "explore",
  emptyTitle = "No posts yet",
  emptyText = "New public posts will appear here.",
}) => {
  const { theme } = useSelector((state) => state);

  if (result === 0 ){
    return (
      <div className="mx-auto grid min-h-[260px] w-full max-w-[935px] place-items-center content-center gap-3 text-center">
        <span className="material-icons grid h-20 w-20 place-items-center rounded-full border-2 border-neutral-200 text-[42px] text-white">{emptyIcon}</span>
        <h2 className="text-3xl font-extrabold text-white">{emptyTitle}</h2>
        <p className="max-w-sm text-sm text-white">{emptyText}</p>
      </div>
    );
  }

    const imageShow = (src) => {
      return (
        <img
          src={src}
          alt={src}
          className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.035] group-hover:brightness-75 ${theme ? "invert" : ""}`}
        />
      );
    };

    const videoShow = (src) => {
      return (
        <video
          controls
          src={src}
          alt={src}
          className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.035] group-hover:brightness-75 ${theme ? "invert" : ""}`}
        />
      );
    };
    return (
      <div className="mx-auto grid w-full max-w-[935px] grid-cols-3 gap-1">
        {posts && posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id} className="block min-w-0">
            <div className="group relative aspect-square cursor-pointer overflow-hidden bg-white/5">
              {post.images[0].url.match(/video/i)
                ? videoShow(post.images[0].url, theme)
                : imageShow(post.images[0].url, theme)
              }


              <div className="absolute inset-0 flex items-center justify-center gap-7 bg-black/45 opacity-0 transition duration-200 group-hover:opacity-100">
                <i className="far fa-thumbs-up text-lg font-bold text-white">{post.likes.length}</i>
                <i className="far fa-comments text-lg font-bold text-white">{post.comments.length}</i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
};

export default PostThumb
