import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../ContentList";
import { getSpamPosts } from '../../../redux/actions/adminAction';

const Spam = () => {
  const { auth, admin } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpamPosts(auth.token));
  }, [dispatch, auth.token])


  return (
    <div className="min-h-screen bg-slate-950 p-5 text-white lg:pl-72">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold">Hello {auth.user.username}</h1>
          <p className="mt-1 text-sm text-slate-400">Spam Dashboard</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <ContentList content={admin.spam_posts} />
        </div>
      </div>
    </div>
  );
};

export default Spam;
