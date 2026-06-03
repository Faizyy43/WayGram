import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 text-white backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <svg width="72" height="82" viewBox="0 0 40 50" className="drop-shadow-[0_16px_40px_rgba(124,58,237,0.35)]">
          <polygon
            stroke="#a78bfa"
            strokeWidth="2"
            fill="none"
            points="20,1 40,40 1,40"
          />
          <text fill="#fff" x="5" y="47" fontSize="8">
            Loading
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
