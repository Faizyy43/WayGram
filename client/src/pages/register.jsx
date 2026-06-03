import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const fieldClass =
  "h-[48px] w-full rounded-2xl border-0 bg-[#e8f0fe] px-4 text-sm text-slate-950 outline-none transition placeholder:text-neutral-500 focus:ring-4 focus:ring-[#168cff]/25";

const Register = () => {
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
  const { fullname, username, email, password, cf_password, gender: selectedGender } = userData;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[#111214] text-slate-100">
      <div className="grid h-full lg:grid-cols-[minmax(420px,570px)_minmax(0,1fr)]">
        <section className="relative z-10 flex h-full items-center justify-center overflow-hidden bg-[#1f1f23] px-5 py-4 shadow-2xl">
          <form onSubmit={handleSubmit} className="w-full max-w-[520px] space-y-2.5 rounded-[24px] bg-[#18191d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="space-y-1">
              <Link to="/" className="inline-grid h-9 w-9 place-items-center rounded-full text-neutral-300 transition hover:bg-white/10 hover:text-white" aria-label="Back to login">
                <span className="material-icons text-[24px]">chevron_left</span>
              </Link>
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="material-icons text-[20px]">all_inclusive</span>
                <span className="text-sm font-semibold">WayGram</span>
              </div>
              <h1 className="m-0 text-2xl font-bold tracking-tight text-white">Get started on WayGram</h1>
              <p className="m-0 text-sm font-semibold text-neutral-300">
                Sign up to see photos and videos from your friends.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-white" htmlFor="email">Mobile number or email</label>
              <input
                type="email"
                className={fieldClass}
                id="email"
                onChange={handleChangeInput}
                value={email}
                name="email"
                placeholder="Mobile number or email"
                style={{ background: alert.email ? "#3a101b" : "" }}
                required
              />
              {alert.email && <small className="block text-sm text-rose-400">{alert.email}</small>}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-white" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    type={typePass ? "text" : "password"}
                    className={`${fieldClass} pr-16`}
                    id="password"
                    onChange={handleChangeInput}
                    value={password}
                    name="password"
                    placeholder="Password"
                    style={{ background: alert.password ? "#3a101b" : "" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setTypePass(!typePass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white transition hover:text-neutral-300"
                  >
                    {typePass ? "Hide" : "Show"}
                  </button>
                </div>
                {alert.password && <small className="block text-xs text-rose-400">{alert.password}</small>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-white" htmlFor="cf_password">Confirm</label>
                <div className="relative">
                  <input
                    type={typeCfPass ? "text" : "password"}
                    className={`${fieldClass} pr-16`}
                    id="cf_password"
                    onChange={handleChangeInput}
                    value={cf_password}
                    name="cf_password"
                    placeholder="Confirm password"
                    style={{ background: alert.cf_password ? "#3a101b" : "" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setTypeCfPass(!typeCfPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white transition hover:text-neutral-300"
                  >
                    {typeCfPass ? "Hide" : "Show"}
                  </button>
                </div>
                {alert.cf_password && <small className="block text-xs text-rose-400">{alert.cf_password}</small>}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-bold text-white">Birthday</label>
                <span className="material-icons text-[18px] text-neutral-300">help_outline</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Month", "Day", "Year"].map((item) => (
                  <select key={item} className="h-[48px] rounded-2xl border-0 bg-[#24262b] px-3 text-sm font-semibold text-neutral-300 outline-none focus:ring-4 focus:ring-[#168cff]/20">
                    <option>{item}</option>
                  </select>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-white" htmlFor="fullname">Name</label>
                <input
                  type="text"
                  className={fieldClass}
                  id="fullname"
                  onChange={handleChangeInput}
                  value={fullname}
                  name="fullname"
                  placeholder="Full name"
                  style={{ background: alert.fullname ? "#3a101b" : "" }}
                  required
                />
                {alert.fullname && <small className="block text-xs text-rose-400">{alert.fullname}</small>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-white" htmlFor="username">Username</label>
                <input
                  type="text"
                  className={fieldClass}
                  id="username"
                  onChange={handleChangeInput}
                  value={username.toLowerCase().replace(/ /g, "")}
                  name="username"
                  placeholder="Username"
                  style={{ background: alert.username ? "#3a101b" : "" }}
                  required
                />
                {alert.username && <small className="block text-xs text-rose-400">{alert.username}</small>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {["male", "female"].map((gender) => (
                <label
                  key={gender}
                  className={`inline-flex h-11 items-center justify-center rounded-2xl text-sm font-semibold capitalize transition ${
                    selectedGender === gender
                      ? "bg-[#16324c] text-white"
                      : "bg-[#24262b] text-neutral-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    defaultChecked={gender === "male"}
                    onChange={handleChangeInput}
                    className="sr-only"
                  />
                  {gender}
                </label>
              ))}
            </div>

            <div className="space-y-1 text-[11px] font-semibold leading-4 text-neutral-400">
              <p className="m-0">
                People who use our service may have uploaded your contact information to WayGram. <span className="text-[#168cff]">Learn more.</span>
              </p>
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-full bg-[#168cff] px-6 text-base font-bold text-white transition hover:bg-[#2e99ff]"
            >
              Submit
            </button>

            <Link
              to="/"
              className="block h-12 rounded-full bg-transparent px-6 text-center text-base font-bold leading-[48px] text-white transition hover:bg-white/[0.04]"
            >
              I already have an account
            </Link>
          </form>
        </section>

        <section className="hidden h-full items-center justify-center overflow-hidden bg-[#0b0f12] px-10 py-8 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_30rem),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.12),transparent_28rem)]" />
          <div className="relative w-full max-w-[620px] text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-amber-400 via-fuchsia-500 to-indigo-500 shadow-lg">
              <span className="material-icons text-[34px] text-white">photo_camera</span>
            </div>
            <h2 className="mx-auto mt-8 max-w-[560px] text-5xl font-semibold leading-tight tracking-tight text-white">
              Join WayGram and share your day with friends.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-neutral-400">
              Create a profile, post your moments, follow friends, and keep every conversation close.
            </p>
            <div className="relative mx-auto mt-14 h-[300px] w-[420px]">
              <div className="absolute left-4 top-12 h-[210px] w-[150px] -rotate-12 rounded-[28px] border border-white/15 bg-gradient-to-br from-cyan-300 via-blue-500 to-slate-900 shadow-2xl" />
              <div className="absolute left-[135px] top-0 h-[270px] w-[175px] rounded-[30px] border border-white/15 bg-gradient-to-br from-amber-300 via-fuchsia-500 to-black shadow-2xl" />
              <div className="absolute right-4 top-16 h-[210px] w-[150px] rotate-12 rounded-[28px] border border-white/15 bg-gradient-to-br from-lime-300 via-emerald-500 to-indigo-700 shadow-2xl" />
              <span className="absolute left-[184px] top-[110px] grid h-14 w-14 place-items-center rounded-full bg-white text-slate-950 shadow-xl">
                <span className="material-icons text-[30px]">person_add</span>
              </span>
            </div>
          </div>
        </section>
      </div>

      <footer className="pointer-events-none absolute bottom-3 left-[570px] right-0 hidden flex-wrap justify-center gap-x-5 gap-y-2 px-5 text-xs text-neutral-500 xl:flex">
        {["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms", "Locations", "WayGram Lite", "Contact Uploading & Non-Users"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </footer>
    </div>
  );
};

export default Register;
