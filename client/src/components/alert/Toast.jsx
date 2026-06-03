import React, { useEffect } from "react";

const Toast = ({ msg, handleShow, bgColor }) => {
  const isSuccess = bgColor === "bg-success";
  const tone = isSuccess
    ? {
        icon: "check_circle",
        iconBg: "bg-emerald-400/15 text-emerald-300",
        border: "border-emerald-400/20",
      }
    : {
        icon: "error",
        iconBg: "bg-rose-400/15 text-rose-300",
        border: "border-rose-400/20",
      };

  useEffect(() => {
    const timer = setTimeout(handleShow, 4200);
    return () => clearTimeout(timer);
  }, [handleShow]);

  return (
    <div
      className={`premium-surface fixed right-4 top-5 z-[70] w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-[18px] border ${tone.border} text-white`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4">
        <span className={`material-icons grid h-10 w-10 shrink-0 place-items-center rounded-full text-[22px] ${tone.iconBg}`}>
          {tone.icon}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <strong className="block text-sm font-semibold text-white">{msg.title}</strong>
          <p className="m-0 mt-1 text-sm leading-5 text-neutral-300">{msg.body}</p>
        </div>
        <button
          type="button"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
          onClick={handleShow}
          aria-label="Close notification"
        >
          <span className="material-icons text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;
