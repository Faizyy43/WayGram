import React from 'react';
import { useSelector } from "react-redux";
import RegisterAdmin from "./RegisterAdmin";

const AdminManagement = () => {
        const { auth } = useSelector((state) => state);
    return (
      <div className="min-h-screen bg-slate-950 p-5 text-white lg:pl-72">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold">Hello {auth.user.username}</h1>
            <p className="mt-1 text-sm text-slate-400">Welcome to your Admin Management</p>
          </div>
          <RegisterAdmin />
        </div>
      </div>
    );
}

export default AdminManagement
