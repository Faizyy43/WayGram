import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogin, login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [userType, setUserType] = useState("user");
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch(userType === "admin" ? adminLogin(userData) : login(userData));
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[#111214] text-slate-100">
      <div className="grid h-full lg:grid-cols-[minmax(360px,500px)_minmax(0,1fr)]">
        <section className="relative z-10 flex items-center justify-center bg-[#1f1f23] px-5 py-6 shadow-2xl">
          <div className="w-full max-w-[360px] rounded-[24px] bg-[#18191d]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2.5">
                <div>
                  <h1 className="m-0 text-[32px] font-bold tracking-tight text-white">WayGram</h1>
                  <p className="m-0 mt-1.5 text-sm leading-6 text-neutral-400">
                    Log in to see photos, stories, and messages from your friends.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  className="h-[52px] w-full rounded-2xl border-0 bg-[#e8f0fe] px-5 text-base text-slate-950 outline-none transition placeholder:text-neutral-500 focus:ring-4 focus:ring-[#168cff]/25"
                  id="exampleInputEmail1"
                  onChange={handleChangeInput}
                  value={email}
                  name="email"
                  placeholder="Mobile number, username or email"
                  required
                />
                <div className="relative">
                  <input
                    type={typePass ? "text" : "password"}
                    className="h-[52px] w-full rounded-2xl border-0 bg-[#e8f0fe] px-5 pr-20 text-base text-slate-950 outline-none transition placeholder:text-neutral-500 focus:ring-4 focus:ring-[#168cff]/25"
                    id="exampleInputPassword1"
                    onChange={handleChangeInput}
                    value={password}
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setTypePass(!typePass)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-white transition hover:text-neutral-300"
                  >
                    {typePass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {["user", "admin"].map((type) => (
                  <label
                    key={type}
                    className={`inline-flex h-11 items-center justify-center rounded-2xl text-sm font-semibold capitalize transition ${
                      userType === type
                        ? "bg-[#16324c] text-white shadow-inner"
                        : "bg-[#18191d] text-neutral-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={userType === type}
                      onChange={() => setUserType(type)}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="h-[52px] w-full rounded-full bg-[#168cff] px-6 text-base font-bold text-white transition hover:bg-[#2e99ff] disabled:cursor-not-allowed disabled:bg-[#174a82] disabled:text-white/45"
                disabled={!email || !password}
              >
                Log in
              </button>

              <button type="button" className="w-full text-center text-sm font-semibold text-white transition hover:text-[#168cff]">
                Forgot password?
              </button>

              <div className="space-y-2.5 pt-6">
                <Link
                  to="/register"
                  className="block h-[52px] rounded-full bg-transparent px-6 text-center text-base font-bold leading-[52px] text-[#168cff] transition hover:bg-[#168cff]/10"
                >
                  Create new account
                </Link>
                <p className="m-0 text-center text-sm text-neutral-400">from WayGram</p>
              </div>
            </form>
          </div>
        </section>

        <section className="hidden h-full items-center justify-center overflow-hidden bg-[#0b0f12] px-10 py-8 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.16),transparent_30rem),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.13),transparent_28rem)]" />
          <div className="relative w-full max-w-[640px] text-center">
            <h2 className="mx-auto max-w-[620px] text-[52px] font-semibold leading-tight tracking-tight text-white">
              See everyday moments from your <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">close friends.</span>
            </h2>
            <div className="relative mx-auto mt-12 h-[330px] w-[400px]">
              <div className="absolute left-1 top-16 h-[230px] w-[155px] -rotate-12 overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-lime-300 via-emerald-500 to-fuchsia-500 shadow-2xl" />
              <div className="absolute left-[122px] top-0 h-[300px] w-[185px] overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-br from-amber-300 via-rose-400 to-slate-800 shadow-2xl">
                <div className="absolute inset-x-5 top-5 h-1 rounded-full bg-white/80" />
                <div className="absolute bottom-8 left-5 right-5 h-8 rounded-full border-2 border-white/80" />
              </div>
              <div className="absolute right-0 top-[68px] h-[210px] w-[150px] rotate-8 overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-br from-sky-300 via-violet-500 to-rose-300 shadow-2xl" />
              <span className="absolute left-8 top-[165px] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white shadow-xl">
                <span className="material-icons text-[30px]">favorite</span>
              </span>
              <span className="absolute right-10 top-[110px] inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-2 text-sm font-bold text-white shadow-xl">
                <span className="material-icons text-[17px]">star</span>
                <span className="material-icons text-[17px]">check</span>
              </span>
              <span className="absolute left-16 top-10 rotate-[-10deg] rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-xl">
                Live
              </span>
            </div>
          </div>
        </section>
      </div>

      <footer className="pointer-events-none absolute bottom-3 left-[500px] right-0 hidden flex-wrap justify-center gap-x-5 gap-y-2 px-5 text-xs text-neutral-500 xl:flex">
        {["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms", "Locations", "WayGram Lite", "Contact Uploading & Non-Users"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </footer>
    </div>
  );
};

export default Login;
