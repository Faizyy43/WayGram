import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-violet-400" />
        <span className="text-sm font-bold uppercase tracking-[0.22em] text-slate-200">
          Loading
        </span>
      </div>
    </div>
  );
};

export default Loading;
