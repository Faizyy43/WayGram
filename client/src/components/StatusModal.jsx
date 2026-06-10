import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { imageShow, videoShow } from "../utils/mediaShow.jsx";

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        return (err = "File does not exist.");
      }
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Image size must be less than 5 mb.");
      }
      return newImages.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch(() => {
          setStream(false);
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: "Camera permission was blocked or unavailable." },
          });
        });
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    if (tracks) tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Add image(s)." },
      });
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    if (tracks) {
      tracks.stop();
    }
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="premium-surface w-full max-w-lg overflow-hidden rounded-[20px]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h5 className="m-0 text-base font-semibold text-white">Create new post</h5>
          <span
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-2xl text-slate-200 transition hover:bg-white/10 hover:text-white"
            onClick={() =>
              {
                if (tracks) tracks.stop();
                dispatch({ type: GLOBALTYPES.STATUS, payload: false });
              }
            }
          >
            &times;
          </span>
        </div>
        <div className="space-y-4 p-5">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name="content"
            placeholder={`${auth.user.username}, What's on your mind?`}
            className={`premium-control min-h-32 w-full resize-none rounded-xl p-3 text-sm ${theme ? "invert" : ""}`}
          />

          <div className="flex justify-end">
            <Icons setContent={setContent} content={content} theme={theme} />
          </div>

          <div className="grid max-h-72 grid-cols-2 gap-3 overflow-auto sm:grid-cols-3">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-black">
                {img.camera ? (
                  imageShow(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img, theme))
                      : imageShow(URL.createObjectURL(img, theme))}
                  </>
                )}
                <span className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-black/70 text-xl text-white" onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="relative overflow-hidden rounded-lg bg-black">
              <video
                width="100%"
                height="100%"
                ref={videoRef}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                autoPlay
                muted
              />

              <span className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-black/70 text-xl text-white" onClick={handleStopStream}>&times;</span>
              <canvas style={{ display: "none" }} ref={refCanvas} />
            </div>
          )}

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-2 text-slate-200">
            {stream ? (
              <i className="fas fa-camera cursor-pointer rounded-full p-3 transition hover:bg-neutral-900" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera cursor-pointer rounded-full p-3 transition hover:bg-white/[0.08]" onClick={handleStream} />
                <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full transition hover:bg-white/[0.08]">
                  <i className="fas fa-image" />
                  <input
                    onChange={handleChangeImages}
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="border-t border-white/10 p-5">
          <button type="submit" className="premium-button h-11 w-full rounded-xl px-5 text-sm font-semibold">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
