import React from "react";
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import CardHeader from "./home/post_card/CardHeader";
import Comments from "./home/Comments";
import InputComment from "./home/InputComment";

const PostCard = ({ post, theme }) => {
  return (
    <div className="post-card">
      <div className="px-4 sm:px-5">
        <CardHeader post={post} />
      </div>
      <CardBody post={post} theme={theme} />
      <div className="px-4 sm:px-5">
        <CardFooter post={post} />
        <Comments post={post} />
        <InputComment post={post} />
      </div>
    </div>
  );
};

export default PostCard;
