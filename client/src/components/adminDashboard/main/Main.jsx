import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import Chart from "../charts/Chart";
import {
  getTotalUsers,
  getTotalPosts,
  getTotalComments,
  getTotalLikes,
  getTotalActiveUsers,
  getTotalSpamPosts,
} from "../../../redux/actions/adminAction";


const Main = () => {
    const { auth, admin, socket } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getTotalUsers(auth.token));
      dispatch(getTotalPosts(auth.token));
      dispatch(getTotalComments(auth.token));
      dispatch(getTotalLikes(auth.token));
      dispatch(getTotalSpamPosts(auth.token));
      dispatch(getTotalActiveUsers({ auth, socket }));
    }, [dispatch, auth.token, socket, auth]);
  return (
    <div className="min-h-screen bg-slate-950 p-5 text-white lg:pl-72">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold">Hello {auth.user.username}</h1>
          <p className="mt-1 text-sm text-slate-400">Welcome to your Admin Dashboard</p>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ["fa-users", "Total Users", admin.total_users, "text-sky-300"],
            ["fa-comments", "Total Comments", admin.total_comments, "text-rose-300"],
            ["fa-camera", "Total Posts", admin.total_posts, "text-amber-300"],
            ["fa-ban", "Reported Posts", admin.total_spam_posts, "text-red-300"],
            ["fa-thumbs-up", "Total Likes", admin.total_likes, "text-emerald-300"],
            ["fa-check-circle", "Total Active Users", admin.total_active_users, "text-green-300"],
          ].map(([icon, label, value, color]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
              <i className={`fa ${icon} text-2xl ${color}`} aria-hidden="true" />
              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="m-0 text-sm font-semibold text-slate-400">{label}</p>
                <span className="text-3xl font-extrabold text-white">{value}</span>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE 
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Income</h1>
                <p>$75,300</p>
              </div>

              <div className="card2">
                <h1>Sales</h1>
                <p>$124,200</p>
              </div>

              <div className="card3">
                <h1>Users</h1>
                <p>3900</p>
              </div>

              <div className="card4">
                <h1>Orders</h1>
                <p>1881</p>
              </div>
            </div>
          </div>
        </div>
        CHARTS ENDS HERE --> */}
      </div>
    </div>
  );
};

export default Main;
