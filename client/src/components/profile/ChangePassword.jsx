import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/actions/authAction";

const fieldClass =
  "h-10 w-full rounded-md bg-[#121212] px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:bg-[#191919]";

const ChangePassword = ({ setChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfNewPassword, setCnfNewPassword] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword({ oldPassword, newPassword, cnfNewPassword, auth }));
    setChangePassword(false);
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-sm overflow-hidden rounded-xl bg-[#121212]">
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <h5 className="m-0 text-base font-semibold text-white">Change password</h5>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-full text-2xl text-white hover:bg-neutral-800" onClick={() => setChangePassword(false)}>
            &times;
          </button>
        </div>
        <div className="space-y-3 p-4">
          <input type="password" className={fieldClass} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Current password" />
          <input type="password" className={fieldClass} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
          <input type="password" className={fieldClass} value={cnfNewPassword} onChange={(e) => setCnfNewPassword(e.target.value)} placeholder="Confirm new password" />
        </div>
        <div className="border-t border-neutral-800 p-4">
          <button className="h-10 w-full rounded-lg bg-[#4f5cff] text-sm font-semibold text-white transition hover:bg-[#6570ff]" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
