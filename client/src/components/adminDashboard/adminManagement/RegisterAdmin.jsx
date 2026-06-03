import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerAdmin } from "../../../redux/actions/authAction";

const RegisterAdmin = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAdmin({ ...userData, role: "admin" }));
    setUserData(initialState);
  };

  const inputClass =
    "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/40 focus:ring-4 focus:ring-sky-400/10";

  const fields = [
    ["fullname", "Full name", "text", fullname, alert.fullname],
    ["username", "User name", "text", username.toLowerCase().replace(/ /g, ""), alert.username],
    ["email", "Email address", "email", email, alert.email],
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
        <h3 className="text-center text-2xl font-extrabold uppercase tracking-[0.22em] text-white">
          WayGram
        </h3>

        {fields.map(([name, label, type, value, error]) => (
          <div key={name} className="space-y-2">
            <label htmlFor={name} className="text-sm font-bold text-slate-200">
              {label}
            </label>
            <input
              type={type}
              className={`${inputClass} ${error ? "bg-rose-500/10" : ""}`}
              id={name}
              onChange={handleChangeInput}
              value={value}
              name={name}
            />
            <small className="text-sm text-rose-400">{error || ""}</small>
          </div>
        ))}

        {[
          ["password", "Password", password, typePass, setTypePass, alert.password],
          ["cf_password", "Confirm Password", cf_password, typeCfPass, setTypeCfPass, alert.cf_password],
        ].map(([name, label, value, show, setShow, error]) => (
          <div key={name} className="space-y-2">
            <label htmlFor={name} className="text-sm font-bold text-slate-200">
              {label}
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className={`${inputClass} pr-20 ${error ? "bg-rose-500/10" : ""}`}
                id={name}
                onChange={handleChangeInput}
                value={value}
                name={name}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-sky-300"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            <small className="text-sm text-rose-400">{error || ""}</small>
          </div>
        ))}

        <div className="flex flex-wrap gap-3">
          {["male", "female"].map((gender) => (
            <label key={gender} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold capitalize text-white">
              <input
                type="radio"
                name="gender"
                value={gender}
                defaultChecked={gender === "male"}
                onChange={handleChangeInput}
                className="accent-violet-500"
              />
              {gender}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(124,58,237,0.24)] transition hover:-translate-y-0.5"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
