import React from 'react';
import Avatar from '../Avatar';
import { imageShow, videoShow } from '../../utils/mediaShow'; 

const MsgDisplay = ({user, msg, theme}) => {
    return (
      <>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Avatar src={user.avatar} size="small-avatar" />
          <span>{user.username}</span>
        </div>
        {msg.text && (
          <div className={`mb-1 rounded-2xl px-4 py-2.5 text-sm leading-6 ${theme ? "invert" : ""} bg-white/10 text-white`}>
            {msg.text}
          </div>
        )}

        {msg.media &&
          msg.media.map((item, index) => (
            <div key={index} className="max-h-[380px] max-w-[380px] overflow-hidden rounded-2xl">
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}

        <div className="text-xs text-slate-500">
          {new Date(msg.createdAt).toLocaleString()}
        </div>
      </>
    );
}

export default MsgDisplay
