import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { likePost, savePost, unLikePost, unSavePost } from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-100 transition hover:bg-white/[0.07] hover:text-white">
            <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
          </div>
          <Link
            to={`/post/${post._id}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-100 transition hover:bg-white/[0.07] hover:text-white"
          >
            <i className="far fa-comments" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-100 transition hover:bg-white/[0.07] hover:text-white"
            onClick={() => setIsShare(!isShare)}
          >
            <i className="fa fa-share" />
          </button>
        </div>

        <button
          type="button"
          onClick={saved ? handleUnSavePost : handleSavePost}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-100 transition hover:bg-white/[0.07] hover:text-white"
        >
          <i className={saved ? "fas fa-bookmark text-white" : "far fa-bookmark"} />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-sm font-semibold text-white">
        <span>{post.likes.length} likes</span>
        <span>{post.comments.length} comments</span>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} setIsShare={setIsShare} />}
    </div>
  );
};

export default CardFooter;
