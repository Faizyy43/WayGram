import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({user}) => {
    const [ followed, setFollowed ] = useState(false);

    const { auth, profile, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false);

    useEffect(() => {
      if (auth.user.following.find((item) => item._id === user._id)) {
        setFollowed(true);
      }
      return () => setFollowed(false);
    }, [auth.user.following, user._id]);

    const handleFollow = async () => {
        if(load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth, socket }));
        setLoad(false);
    };

    const handleUnFollow = async () => {
      if (load) return;

      setFollowed(false);
      setLoad(true);
      await dispatch(unfollow({ users: profile.users, user, auth, socket }));
      setLoad(false);
    };


    return (
      <>
        {followed ? (
          <button className="rounded-lg bg-neutral-800 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50" disabled={load} onClick={handleUnFollow}>
            Unfollow
          </button>
        ) : (
          <button className="rounded-lg bg-[#4f5cff] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#6570ff] disabled:opacity-50" disabled={load} onClick={handleFollow}>
            Follow
          </button>
        )}
      </>
    );
}

export default FollowBtn
