import React, { useState, useEffect} from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Following from './Following';
import Followers from './Followers';
import ChangePassword from './ChangePassword';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { logout } from '../../redux/actions/authAction';

const Info = ({id, auth, profile, dispatch, postCount = 0}) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const settingsItems = [
      { label: "Apps and websites", icon: "apps" },
      { label: "QR code", icon: "qr_code_2" },
      { label: "Notifications", icon: "notifications_none" },
      { label: "Settings and privacy", icon: "admin_panel_settings" },
      { label: "Meta Verified", icon: "verified" },
      { label: "Supervision", icon: "supervisor_account" },
      { label: "Login activity", icon: "schedule" },
    ];

    const handleSettingsClick = (label) => {
      if (label === "Log Out") {
        dispatch(logout());
        return;
      }
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: `${label} is ready for a future settings page.` },
      });
      setShowSettings(false);
    };

    useEffect(() => {
      if (id === auth.user._id) {
          setUserData([auth.user]);
      }else{
        const newData = profile.users.filter(user => user._id === id);
        setUserData(newData);
      }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
      if (showFollowers || showFollowing || onEdit) {
        dispatch({ type: GLOBALTYPES.MODAL, payload: true });
      } else {
        dispatch({ type: GLOBALTYPES.MODAL, payload: false });
      }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    return (
      <div className="mx-auto w-full max-w-[935px]">
        {userData.map((user) => (
          <div key={user._id} className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-5 sm:grid-cols-[260px_minmax(0,1fr)] sm:gap-8">
            <div className="mx-auto grid h-[86px] w-[86px] shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-900 sm:h-[168px] sm:w-[168px]">
              <Avatar src={user.avatar} size="supper-avatar" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="relative flex flex-wrap items-center gap-3">
                <h2 className="m-0 min-w-0 truncate text-xl font-normal text-white">{user.username}</h2>
                {user._id === auth.user._id ? (
                  <>
                    <button
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white shadow-lg transition hover:border-teal-300/50 hover:bg-white/[0.08]"
                      onClick={() => setShowSettings(!showSettings)}
                      aria-label="Settings"
                    >
                      <span className="material-icons text-[25px]">settings</span>
                    </button>
                    {showSettings && (
                      <div className="premium-surface absolute right-0 top-12 z-40 w-[292px] overflow-hidden rounded-[18px] p-2 text-left text-sm text-white sm:left-auto">
                        <div className="border-b border-white/10 px-3 py-3">
                          <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            Account
                          </p>
                          <p className="m-0 mt-1 truncate text-sm font-semibold text-white">
                            {user.fullname || user.username}
                          </p>
                        </div>

                        {settingsItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-neutral-100 transition hover:bg-white/[0.07]"
                            onClick={() => handleSettingsClick(item.label)}
                          >
                            <span className="material-icons text-[21px] text-neutral-400">{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}

                        <div className="my-2 border-t border-white/10" />
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-semibold text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
                          onClick={() => handleSettingsClick("Log Out")}
                        >
                          <span className="material-icons text-[21px]">logout</span>
                          <span>Log out</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <FollowBtn user={user} />
                )}
              </div>

              <h6 className="mt-4 text-sm font-semibold text-white sm:mt-5">
                {user.fullname || user.username}
              </h6>
              {user.mobile && <p className="m-0 text-sm text-neutral-300">{user.mobile}</p>}
              {user.address && <p className="m-0 text-sm text-neutral-300">{user.address}</p>}
              {user.website && (
                <a
                  className="text-sm font-semibold text-[#e0f1ff] hover:text-white"
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.website}
                </a>
              )}
              {user.story && <p className="mt-1 max-w-xl text-sm leading-5 text-neutral-200">{user.story}</p>}

              <div className="mt-5 hidden flex-wrap gap-8 text-base text-neutral-100 sm:flex">
                <span><strong>{postCount}</strong> posts</span>
                
                <span className="cursor-pointer hover:text-white" onClick={() => setShowFollowers(true)}>
                  <strong>{user.followers.length}</strong> followers
                </span>
                <span className="cursor-pointer hover:text-white" onClick={() => setShowFollowing(true)}>
                  <strong>{user.following.length}</strong> following
                </span>
              </div>

              {user._id === auth.user._id && (
                <div className="mt-7 hidden grid-cols-2 gap-3 sm:grid">
                  <button
                    className="rounded-xl bg-[#26292e] py-3 text-sm font-semibold text-white transition hover:bg-[#34373d]"
                    onClick={() => setOnEdit(true)}
                  >
                    Edit profile
                  </button>
                  <button
                    className="rounded-xl bg-[#26292e] py-3 text-sm font-semibold text-white transition hover:bg-[#34373d]"
                    onClick={() => setChangePassword(true)}
                  >
                    Change password
                  </button>
                </div>
              )}
            </div>

            {user._id === auth.user._id && (
              <div className="col-span-2 grid grid-cols-2 gap-2 sm:hidden">
                <button
                  className="rounded-lg bg-[#26292e] py-1.5 text-sm font-semibold text-white transition hover:bg-[#34373d]"
                  onClick={() => setOnEdit(true)}
                >
                  Edit profile
                </button>
                <button
                  className="rounded-lg bg-[#26292e] py-1.5 text-sm font-semibold text-white transition hover:bg-[#34373d]"
                  onClick={() => setChangePassword(true)}
                >
                  Change password
                </button>
              </div>
            )}

            <div className="col-span-2 grid grid-cols-3 border-y border-neutral-800 py-3 text-center text-sm text-neutral-400 sm:hidden">
              <span><strong className="block text-white">{postCount}</strong> posts</span>
              <button onClick={() => setShowFollowers(true)}><strong className="block text-white">{user.followers.length}</strong> followers</button>
              <button onClick={() => setShowFollowing(true)}><strong className="block text-white">{user.following.length}</strong> following</button>
            </div>

            {onEdit && <EditProfile setOnEdit={setOnEdit} />}
            {changePassword && <ChangePassword setChangePassword={setChangePassword} />}

            {showFollowers && (
              <Followers
                users={user.followers}
                setShowFollowers={setShowFollowers}
              />
            )}
            {showFollowing && (
              <Following
                users={user.following}
                setShowFollowing={setShowFollowing}
              />
            )}
          </div>
        ))}
      </div>
    );
}

export default Info
