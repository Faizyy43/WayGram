import React from "react";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import { useSelector } from "react-redux";

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="fixed inset-0 z-[60] bg-black/75 p-4 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 max-h-[80vh] w-[400px] max-w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-[#121212] p-4">
        <h5 className="text-center text-base font-semibold text-white">Following</h5>
        <hr className="my-3 border-neutral-800" />
        {users.map((user) => (
          <UserCard
            key={user._id}
            setShowFollowing={setShowFollowing}
            user={user}
          >
            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}

        <div className="absolute right-4 top-2 cursor-pointer text-3xl text-slate-300 hover:text-white" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Following;
