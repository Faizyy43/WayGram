import React from "react";
import { useSelector } from "react-redux";

import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";
import Search from "../components/header/Search";

import LoadIcon from "../images/loading.gif";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="min-h-screen px-3 py-5 text-slate-100 sm:px-5 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,680px)_320px]">
        <main className="flex min-w-0 flex-col gap-5">
          <section className="premium-surface rounded-[18px] p-3">
            <Search />
          </section>

          <section className="premium-surface rounded-[18px] p-4">
            <Status />
          </section>

          <section className="flex flex-col gap-5">
            {homePosts.loading ? (
              <img src={LoadIcon} alt="loading" className="mx-auto my-6 h-14 w-14" />
            ) : homePosts.result === 0 ? (
              <div className="premium-surface grid min-h-[260px] place-items-center content-center gap-3 rounded-[18px] p-8 text-center">
                <span className="material-icons grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white">photo_camera</span>
                <h2 className="text-lg font-bold text-white">No posts yet</h2>
                <p className="text-sm text-slate-400">Share a moment to start your feed.</p>
              </div>
            ) : (
              <Posts />
            )}
          </section>
        </main>

        <aside className="hidden xl:sticky xl:top-7 xl:block">
          <RightSideBar />
        </aside>
      </div>
    </div>
  );
};

export default Home;
