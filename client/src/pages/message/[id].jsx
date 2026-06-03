import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="grid h-[calc(100dvh-72px)] grid-cols-1 overflow-hidden bg-black md:h-screen md:grid-cols-[minmax(340px,420px)_minmax(0,1fr)] xl:grid-cols-[minmax(420px,620px)_minmax(0,1fr)]">
      <div className="min-w-0 border-b border-neutral-800 bg-black md:border-b-0 md:border-r">
        <LeftSide />
      </div>

      <div className="flex min-w-0 flex-col bg-black">
        <RightSide /> 
      </div>
    </div>
  );
};

export default Conversation;
