import React, { useState } from "react";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <div className="px-4 pb-3 text-sm leading-6 text-slate-200 sm:px-5">
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + " "
            : post.content.slice(0, 60) + "..."}
        </span>
        {post.content.length > 60 && (
          <button
            type="button"
            onClick={() => setReadMore(!readMore)}
            className="ml-2 text-sm font-semibold text-neutral-400 transition hover:text-white"
          >
            {readMore ? "Hide Content" : "Read More"}
          </button>
        )}
      </div>
      {post.images.length > 0 && <Carousel images={post.images} id={post._id} />}
    </div>
  );
};

export default CardBody;
