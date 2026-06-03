import React from 'react'
import { useSelector } from "react-redux";

const Avatar = ({src, size}) => {
     const { theme } = useSelector((state) => state);
     const sizes = {
       "big-avatar": "h-[50px] w-[50px]",
       "small-avatar": "h-10 w-10",
       "medium-avatar": "h-9 w-9",
       "supper-avatar": "h-[150px] w-[150px]",
     };
    return (
        <img
          src={src}
          alt="Avatar"
          className={`${sizes[size] || size || "h-10 w-10"} rounded-full object-cover ${theme ? "invert" : ""}`}
        />
    );
}

export default Avatar
