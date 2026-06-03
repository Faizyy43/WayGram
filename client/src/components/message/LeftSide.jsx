import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { addUser, getConversations } from "../../redux/actions/messageAction";
import { getDataAPI, getErrorMessage } from "../../utils/fetchData";
import Avatar from "../Avatar";

const LeftSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: getErrorMessage(err) },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => id === user._id;

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (pageEnd.current) observer.observe(pageEnd.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  const users = searchUsers.length !== 0 ? searchUsers : message.users;
  const noteUsers = [auth.user, ...message.users].slice(0, 8);

  return (
    <section className="flex h-full flex-col bg-black">
      <div className="px-5 pb-4 pt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <button className="flex min-w-0 items-center gap-2 text-left text-xl font-bold text-white transition hover:text-neutral-300">
            <span className="max-w-[280px] truncate">
              {auth.user.username || auth.user.name}
            </span>
            <span className="material-icons text-[20px]">keyboard_arrow_down</span>
          </button>
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition hover:bg-neutral-900"
            aria-label="New message"
            onClick={() => document.getElementById("message-search")?.focus()}
          >
            <span className="material-icons text-[27px]">edit_square</span>
          </button>
        </div>

        <form className="relative" onSubmit={handleSearch}>
          <span className="material-icons pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-neutral-400">
            search
          </span>
          <input
            type="text"
            id="message-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="h-12 w-full rounded-3xl border-0 bg-[#26292e] px-12 text-base text-white outline-none placeholder:text-neutral-400 transition focus:bg-[#30343a]"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSearchUsers([]);
              }}
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-neutral-700 text-neutral-300 transition hover:bg-neutral-600"
            >
              &times;
            </button>
          )}
        </form>
      </div>

      <div className="flex gap-3 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {noteUsers.map((user, index) => (
          <button
            type="button"
            key={`${user._id}-${index}`}
            className="group w-[86px] shrink-0 text-center"
            onClick={() => index !== 0 && handleAddUser(user)}
          >
            <div className="mx-auto grid h-[74px] w-[74px] place-items-center rounded-full border border-neutral-800 bg-neutral-900 transition group-hover:border-neutral-500">
              <Avatar src={user.avatar} size="h-[66px] w-[66px]" />
            </div>
            <span className="mt-2 block truncate text-xs text-neutral-200">
              {index === 0 ? "Your note" : user.username}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-5 pb-2">
        <h2 className="m-0 text-base font-bold text-white">Messages</h2>
        <button className="text-sm font-semibold text-neutral-400 transition hover:text-white">
          {message.users.length} chats
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-3">
        {users.map((user) => (
          <button
            type="button"
            key={user._id}
            className={`group flex w-full items-center gap-3 px-5 py-3 text-left transition ${
              isActive(user) ? "bg-neutral-900" : "hover:bg-neutral-950"
            }`}
            onClick={() => handleAddUser(user)}
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-900">
              <Avatar src={user.avatar} size="h-14 w-14" />
              {!searchUsers.length && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-black bg-emerald-500 opacity-0 transition group-hover:opacity-100" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-white">
                {user.username}
              </span>
              <span className="mt-1 block truncate text-sm text-neutral-400">
                {searchUsers.length ? user.fullname : user.text || "Active now"}
              </span>
            </div>
            {!searchUsers.length && (
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4f5cff]" />
            )}
          </button>
        ))}

        {users.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-neutral-500">
            No conversations found
          </div>
        )}

        <button className="opacity-0" ref={pageEnd}>
          Load more..
        </button>
      </div>
    </section>
  );
};

export default LeftSide;
