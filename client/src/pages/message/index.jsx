import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
    return (
      <div className="grid h-[calc(100dvh-72px)] grid-cols-1 overflow-hidden bg-black md:h-screen md:grid-cols-[minmax(340px,420px)_minmax(0,1fr)] xl:grid-cols-[minmax(420px,620px)_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-neutral-800 bg-black md:border-b-0 md:border-r">
          <LeftSide />
        </div>

        <div className="grid min-w-0 place-items-center bg-black text-center">
          <div className="max-w-sm px-5">
            <span className="material-icons mb-5 inline-grid h-28 w-28 place-items-center rounded-full border-2 border-neutral-200 text-[54px] text-white">
              near_me
            </span>
            <h4 className="m-0 text-xl font-normal text-white">Your messages</h4>
            <p className="mt-2 text-sm leading-6 text-neutral-400">Send private messages to a friend.</p>
            <button className="mt-5 rounded-lg bg-[#4f5cff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6570ff]">
              Send message
            </button>
          </div>
        </div>
      </div>
    );
}

export default Message
