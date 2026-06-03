import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import PostCard from "../../components/PostCard";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const { auth, detailPost } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPost({ detailPost, id, auth }));
      if (detailPost.length > 0) {
        const newArr = detailPost.filter((post) => post._id === id);
        setPost(newArr);
      }
    }, [detailPost, dispatch, id, auth]);

    return (
      <div className="min-h-screen px-3 py-6 text-white sm:px-5 lg:px-8">
        <div className="posts">
          {post.length === 0 && (
            <div className="premium-surface grid min-h-[260px] w-full max-w-[540px] place-items-center rounded-[18px] p-8 text-center">
              <img src={LoadIcon} alt="Loading..." className="mx-auto h-14 w-14" />
              <p className="mt-4 text-sm text-neutral-400">Loading post...</p>
            </div>
          )}

          {post.map((item) => (
            <PostCard post={item} key={item._id} />
          ))}
        </div>
      </div>
    )
}

export default Post;
