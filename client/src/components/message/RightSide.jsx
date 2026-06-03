import React, { useEffect, useState, useRef } from 'react';
import UserCard from "../UserCard";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MsgDisplay from './MsgDisplay';
import Icons from "../Icons";
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { imageShow, videoShow } from '../../utils/mediaShow';
import { imageUpload } from '../../utils/imageUpload';
import { addMessage, getMessages, MESSAGE_TYPES } from '../../redux/actions/messageAction';
import LoadIcon from '../../images/loading.gif';

const RightSide = () => {
    const { auth, message, theme, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [media, setMedia] = useState([]);
    const [loadMedia, setLoadMedia] = useState(false);

    const refDisplay = useRef();
    const pageEnd = useRef();

    useEffect(() => {
      const newData = message.data.filter(
        (item) => item.sender === auth.user._id || item.sender === id
      );
      setData(newData);
    }, [message.data, auth.user._id, id]);

    useEffect(() => {
      const newUser = message.users.find((user) => user._id === id);
      if (newUser) {
        setUser(newUser);
      }
    }, [message.users, id]);

    const handleChangeMedia = (e) => {
      const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 mb.");
      }
      return newMedia.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setMedia([...media, ...newMedia]);
    };

    const handleDeleteMedia = (index) => {
      const newArr = [...media];
      newArr.splice(index, 1);
      setMedia(newArr);
    };

    const handleSubmit = async e => {
      e.preventDefault();
      if(!text.trim() && media.length === 0) return;
      setText('');
      setMedia([]);

      setLoadMedia(true);

      let newArr = [];
      if(media.length > 0) newArr = await imageUpload(media);

      const msg = {
        sender: auth.user._id,
        recipient: id,
        text,
        media: newArr,
        createdAt: new Date().toISOString()
      }
      setLoadMedia(false);
      await dispatch(addMessage({msg, auth, socket}));
      if (refDisplay.current) {
        refDisplay.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    useEffect(() => {
      if (id) {
        const getMessagesData = async () => {

          dispatch({type: MESSAGE_TYPES.GET_MESSAGES, payload: { messages: [] } });
          
          setPage(1);
          await dispatch(getMessages({ auth, id }));
          if(refDisplay.current){
            refDisplay.current.scrollIntoView({behavior: "smooth", block: "end"});
          }
        };

        getMessagesData();
      }
    }, [id, dispatch, auth]);

    // load more

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((p) => p + 1);
          }
        },
        {
          threshold: 0.1,
        }
      );
      if (pageEnd.current) observer.observe(pageEnd.current);
      return () => observer.disconnect();
    }, [setPage]);

    useEffect(() => {
      if (message.resultData >= (page - 1) * 9 && page > 1) {
        dispatch(getMessages({ auth, id, page }));
      }
    }, [message.resultData, page, id, auth, dispatch]);

    useEffect(() => {
      if (refDisplay.current) {
        refDisplay.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, [text])

    return (
      <>
        <div className="flex min-h-[76px] items-center justify-between border-b border-neutral-800 bg-black px-5 py-3">
          {user.length !== 0 && (
            <>
              <UserCard user={user} />
              <div className="flex items-center gap-1 text-white">
                <button className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-neutral-900">
                  <span className="material-icons text-[24px]">call</span>
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-neutral-900">
                  <span className="material-icons text-[24px]">videocam</span>
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-neutral-900">
                  <span className="material-icons text-[24px]">info</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto px-5 py-6"
          style={{ height: media.length > 0 ? "calc(100% - 180px)" : "" }}
        >
          <div className="flex min-h-full w-full flex-col justify-end" ref={refDisplay}>
            <button style={{marginTop: '-25px', opacity: 0}} ref={pageEnd}>Load..</button>

            {data.map((msg, index) => (
              <div key={index}>
                {msg.sender !== auth.user._id && (
                  <div className="mb-3 grid grid-cols-[minmax(0,72%)] justify-start justify-items-start">
                    <MsgDisplay user={user} msg={msg} theme={theme} />
                  </div>
                )}
                {msg.sender === auth.user._id && (
                  <div className="mb-3 grid grid-cols-[minmax(0,72%)] justify-end justify-items-end">
                    <MsgDisplay user={auth.user} msg={msg} theme={theme} />
                  </div>
                )}
              </div>
            ))}
            {loadMedia && (
              <div className="mb-3 grid grid-cols-[minmax(0,72%)] justify-end justify-items-end">
                <img src={LoadIcon} alt="Loading..." />
              </div>
            )}
          </div>
        </div>

        <div
          className="grid min-h-[82px] w-full grid-cols-[repeat(auto-fill,minmax(70px,1fr))] place-items-center gap-2.5 bg-neutral-950 px-3 py-2"
          style={{ display: media.length > 0 ? "" : "none" }}
        >
          {media.map((item, index) => (
            <div key={index} className="relative h-[70px] w-[70px]">
              {item.type.match(/video/i)
                ? videoShow(URL.createObjectURL(item), theme)
                : imageShow(URL.createObjectURL(item), theme)}
              <span className="absolute -right-1.5 -top-1.5 z-10 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-rose-500 text-sm text-white" onClick={() => handleDeleteMedia(index)}>&times;</span>
            </div>
          ))}
        </div>

        <form className="flex min-h-[76px] items-center gap-2.5 border-t border-neutral-800 bg-black px-5 py-3" onSubmit={handleSubmit}>
          <input
            placeholder="Message..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-11 min-w-0 flex-1 rounded-full border border-neutral-700 bg-black px-4 text-sm text-white outline-none placeholder:text-neutral-500 transition focus:border-neutral-500"
          />
          <Icons setContent={setText} content={text} theme={theme} />
          <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full text-slate-300 transition hover:bg-neutral-900">
            <i className="fas fa-image text-sky-300" />
            <input
              type="file"
              name="file"
              id="file"
              multiple
              accept="image/*,video/*"
              onChange={handleChangeMedia}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
          <button
            type="submit"
            disabled={text || media.length > 0 ? false : true}
            className="material-icons grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#4f5cff] text-white transition hover:bg-[#6570ff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            near_me
          </button>
        </form>
      </>
    );
}

export default RightSide
