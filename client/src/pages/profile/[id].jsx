import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import { useSelector, useDispatch } from "react-redux";
import LoadIcon  from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Saved from '../../components/profile/Saved';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Profile = () => {
  const { profile, auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);
  const profilePostData = profile.posts.find((item) => item._id === id);
  const postCount = profilePostData?.result || 0;

  useEffect(() => {
    if(profile.ids.every(item => item !== id )){
      dispatch(getProfileUsers({ id, auth }));

    }
  }, [id, auth, dispatch, profile.ids]);

    return (
      <div className="min-h-[100dvh] bg-[#050505] px-3 py-6 text-white sm:px-5 sm:py-9 lg:px-8">
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} postCount={postCount} />

        {auth.user._id === id && (
          <div className="mx-auto mt-8 flex max-w-[935px] gap-8 overflow-x-auto pb-7">
            <button
              type="button"
              onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
              className="group w-24 shrink-0 text-center"
              aria-label="Create new post"
            >
              <span className="relative mx-auto grid h-[78px] w-[78px] place-items-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_16px_40px_rgba(0,0,0,0.34)] ring-1 ring-white/10 transition group-hover:border-teal-300/45 group-hover:bg-white/[0.07]">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-black/70 text-white transition group-hover:scale-105">
                  <span className="material-icons text-[30px]">add</span>
                </span>
                <span className="absolute -right-1 bottom-2 grid h-6 w-6 place-items-center rounded-full bg-teal-400 text-black ring-4 ring-black">
                  <span className="material-icons text-[17px]">edit</span>
                </span>
              </span>
              <span className="mt-3 block truncate text-xs font-semibold text-neutral-200 transition group-hover:text-white">
                New post
              </span>
            </button>
          </div>
        )}

        {auth.user._id === id && (
          <div className="mx-auto flex max-w-[935px] justify-around border-t border-white/10 bg-[#050505]">
            <button
              className={`flex min-w-[74px] items-center justify-center border-t py-3 transition ${saveTab ? "border-transparent text-neutral-500 hover:text-neutral-300" : "border-white text-white"}`}
              onClick={() => setSaveTab(false)}
              aria-label="Posts"
            >
              <span className="material-icons text-[28px]">grid_on</span>
            </button>
            <button
              className={`flex min-w-[74px] items-center justify-center border-t py-3 transition ${saveTab ? "border-white text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
              onClick={() => setSaveTab(true)}
              aria-label="Saved"
            >
              <span className="material-icons text-[28px]">bookmark_border</span>
            </button>
            <button className="flex min-w-[74px] items-center justify-center border-t border-transparent py-3 text-neutral-500" aria-label="Reposts">
              <span className="material-icons text-[28px]">autorenew</span>
            </button>
            <button className="flex min-w-[74px] items-center justify-center border-t border-transparent py-3 text-neutral-500" aria-label="Tagged">
              <span className="material-icons text-[28px]">assignment_ind</span>
            </button>
          </div>
        )}

        {profile.loading ? (
          <img className="mx-auto my-6 h-14 w-14" src={LoadIcon} alt="Loading" />
        ) : (
          <>
            {
              saveTab
              ? <Saved auth={auth} dispatch={dispatch}  />
              : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
            }
          </>
        )}
      </div>
    );
}

export default Profile;
