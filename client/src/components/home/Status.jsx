import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-900 ring-2 ring-white/10">
        <Avatar src={auth.user.avatar} size="big-avatar" />
      </div>
      <button
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="premium-control min-h-[46px] flex-1 rounded-xl px-4 text-left text-sm font-medium text-neutral-400 hover:bg-white/[0.08]"
      >
        <span>Share a campus moment...</span>
      </button>
    </div>
  );
};

export default Status;
