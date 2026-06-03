import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";
import { checkImage } from "../../utils/imageUpload";

const inputClass =
  "h-10 w-full rounded-md bg-[#121212] px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:bg-[#191919]";

const EditProfile = ({ setOnEdit }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(auth.user);
  const [avatar, setAvatar] = useState("");
  const { fullname, mobile, address, website, story, gender } = userData;

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    setOnEdit(false);
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-md overflow-hidden rounded-xl bg-[#121212]">
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <h5 className="m-0 text-base font-semibold text-white">Edit profile</h5>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-full text-2xl text-white hover:bg-neutral-800" onClick={() => setOnEdit(false)}>
            &times;
          </button>
        </div>

        <div className="max-h-[75vh] space-y-4 overflow-y-auto p-4">
          <div className="flex items-center gap-4">
            <img
              alt="profile"
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              className="h-16 w-16 rounded-full object-cover"
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
            <label className="cursor-pointer rounded-lg bg-[#4f5cff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6570ff]">
              Change photo
              <input type="file" name="file" accept="image/*" onChange={changeAvatar} className="hidden" />
            </label>
          </div>

          <input className={inputClass} id="fullname" name="fullname" value={fullname || ""} onChange={handleInput} maxLength="25" placeholder="Full name" />
          <input className={inputClass} id="mobile" name="mobile" value={mobile || ""} onChange={handleInput} placeholder="Mobile" />
          <input className={inputClass} id="address" name="address" value={address || ""} onChange={handleInput} placeholder="Address" />
          <input className={inputClass} id="website" name="website" value={website || ""} onChange={handleInput} placeholder="Website" />
          <textarea
            className="min-h-24 w-full resize-none rounded-md bg-[#121212] p-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:bg-[#191919]"
            id="story"
            name="story"
            value={story || ""}
            onChange={handleInput}
            maxLength="200"
            placeholder="Bio"
          />
          <select className={inputClass} name="gender" id="gender" onChange={handleInput} value={gender || "male"}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="border-t border-neutral-800 p-4">
          <button className="h-10 w-full rounded-lg bg-[#4f5cff] text-sm font-semibold text-white transition hover:bg-[#6570ff]" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
