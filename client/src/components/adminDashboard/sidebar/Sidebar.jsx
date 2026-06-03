import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authAction";
import React, { useState } from "react";
import Main from "../main/Main";
import AdminManagement from "../adminManagement/AdminManagement";
import Spam from "../spamManagement/Spam";
import UsersManagement from "../usersManagement/UsersManagement";


const Sidebar = () => {
  const dispatch = useDispatch();
    const [adminMenu, setAdminMenu] = useState(1);


  return (
    <>
      {adminMenu === 1 && <Main />}
      {adminMenu === 2 && <AdminManagement />}
      {adminMenu === 3 && <Spam />}
      {adminMenu === 4 && <UsersManagement />}

      <div className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-white/10 bg-slate-950 p-5 text-white lg:block">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-extrabold">WayGram</h1>
        </div>

        <div className="space-y-2">
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${adminMenu === 1 ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            onClick={() => setAdminMenu(1)}
          >
            <i className="fa fa-th"></i>
            <button type="button">Dashboard</button>
          </div>
          <h2 className="px-4 pt-5 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Admin Control</h2>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${adminMenu === 2 ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            onClick={() => setAdminMenu(2)}
          >
            <i className="fa fa-lock" aria-hidden="true"></i>
            <button type="button">Admin Management</button>
          </div>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${adminMenu === 3 ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            onClick={() => setAdminMenu(3)}
          >
            <i className="fa fa-ban"></i>
            <button type="button">Spams Management</button>
          </div>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${adminMenu === 4 ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
            onClick={() => setAdminMenu(4)}
          >
            <i className="fa fa-wrench"></i>
            <button type="button">Users Management</button>
          </div>

          <div className="pt-6 text-rose-300">
            <i className="fa fa-power-off"></i>
            <Link className="ml-3 font-bold" to="/" onClick={() => dispatch(logout())}>
              Log out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
