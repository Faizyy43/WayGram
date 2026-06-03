import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";

import { getSuggestions } from "../../redux/actions/suggestionsAction";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <aside className="pt-3">
      <div className="mb-5">
        <UserCard user={auth.user} />
      </div>

      <div className="mb-3 flex items-center justify-between gap-3">
        <h5 className="m-0 text-sm font-semibold text-neutral-400">Suggestions for you</h5>
        {!suggestions.loading && (
          <button
            className="text-xs font-semibold text-sky-400 transition hover:text-white"
            onClick={() => dispatch(getSuggestions(auth.token))}
          >
            Refresh
          </button>
        )}
      </div>

      {suggestions.loading ? (
        <img
          src={LoadIcon}
          alt="Loading..."
          className="mx-auto my-6 h-14 w-14"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {suggestions.users.map((user) => (
            <div key={user._id}>
              <UserCard user={user}>
                <FollowBtn user={user} />
              </UserCard>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default RightSideBar;
