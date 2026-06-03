import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
      setLoad(false);
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="relative w-full" onSubmit={handleSearch}>
      <div className="relative">
        <input
          type="text"
          title="Enter to Search"
          name="search"
          value={search}
          id="search"
          autoComplete="off"
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
          }
          placeholder="Search people..."
          className="premium-control h-11 w-full rounded-xl px-10 py-2 text-sm"
        />
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
          <span className="material-icons text-[21px]">search</span>
        </div>

        {search && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/15"
          >
            &times;
          </button>
        )}

        {load && (
          <img
            className="absolute right-12 top-1/2 h-4 w-4 -translate-y-1/2"
            src={LoadIcon}
            alt="Loading"
          />
        )}
      </div>

      {search && (
        <div className="premium-surface absolute left-0 right-0 top-[calc(100%+10px)] z-50 max-h-80 overflow-y-auto rounded-xl p-2">
          {users.length === 0 && !load ? (
            <div className="py-5 text-center text-sm text-slate-400">
              No results found
            </div>
          ) : (
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                border="border"
                handleClose={handleClose}
              />
            ))
          )}
        </div>
      )}
    </form>
  );
};

export default Search;
