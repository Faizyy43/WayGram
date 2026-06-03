import React from 'react';
import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  PinterestShareButton, PinterestIcon,
  RedditShareButton, RedditIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton,TwitterIcon,
  WhatsappShareButton, WhatsappIcon
} from "react-share";

const ShareModal = ({ url, theme, setIsShare }) => {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-[#121212]">
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <span className="font-semibold text-white">Share</span>
          <span className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-2xl text-slate-200 transition hover:bg-neutral-800 hover:text-white" onClick={() => setIsShare(false)}>&times;</span>
        </div>
        <div
          className={`grid grid-cols-4 gap-4 p-5 ${theme ? "invert" : ""}`}
        >
          <FacebookShareButton url={url}>
            <FacebookIcon round={true} size={32} />
          </FacebookShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon round={true} size={32} />
          </TwitterShareButton>

          <EmailShareButton url={url}>
            <EmailIcon round={true} size={32} />
          </EmailShareButton>

          <TelegramShareButton url={url}>
            <TelegramIcon round={true} size={32} />
          </TelegramShareButton>

          <WhatsappShareButton url={url}>
            <WhatsappIcon round={true} size={32} />
          </WhatsappShareButton>

          <PinterestShareButton url={url}>
            <PinterestIcon round={true} size={32} />
          </PinterestShareButton>

          <RedditShareButton url={url}>
            <RedditIcon round={true} size={32} />
          </RedditShareButton>

          <LinkedinShareButton url={url}>
            <LinkedinIcon round={true} size={32} />
          </LinkedinShareButton>
        </div>
        <div className="border-t border-neutral-800 p-4">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(url)}
            className="h-10 w-full rounded-lg bg-white/[0.08] text-sm font-semibold text-white transition hover:bg-white/[0.14]"
          >
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal
