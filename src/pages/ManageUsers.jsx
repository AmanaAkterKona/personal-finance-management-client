import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash, HiOutlineUserGroup, HiOutlineShieldCheck } from "react-icons/hi";
import useTheme from "../pages/useTheme";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users"); // নিশ্চিত করুন ব্যাকএন্ডে এই API আছে
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeAdmin = (user) => {
    axios.patch(`http://localhost:5000/users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          fetchUsers();
          Swal.fire({
            icon: 'success',
            title: `${user.name} is now an Admin!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
          Manage Users
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl font-bold">
          <HiOutlineUserGroup /> {users.length} Total Users
        </div>
      </div>

      <div className={`overflow-x-auto rounded-2xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={theme === 'dark' ? 'text-slate-400 border-b border-slate-700' : 'text-slate-500 border-b border-slate-100'}>
              <th className="p-5 font-semibold uppercase text-xs">#</th>
              <th className="p-5 font-semibold uppercase text-xs">Name</th>
              <th className="p-5 font-semibold uppercase text-xs">Email</th>
              <th className="p-5 font-semibold uppercase text-xs">Role</th>
              <th className="p-5 font-semibold uppercase text-xs text-center">Action</th>
            </tr>
          </thead>
          <tbody className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
            {users.map((user, index) => (
              <tr key={user._id} className={`border-b last:border-0 ${theme === 'dark' ? 'border-slate-700/50 hover:bg-slate-700/20' : 'border-slate-50 hover:bg-slate-50/50'}`}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5 font-medium">{user.name}</td>
                <td className="p-5">{user.email}</td>
                <td className="p-5">
                  {user.role === 'admin' ? (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">Admin</span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-500/10 text-slate-500 rounded-full text-xs font-bold border border-slate-500/20">User</span>
                  )}
                </td>
                <td className="p-5 flex justify-center gap-3">
                  {user.role !== 'admin' && (
                    <button onClick={() => handleMakeAdmin(user)} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" title="Make Admin">
                      <HiOutlineShieldCheck size={18} />
                    </button>
                  )}
                  <button className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors" title="Delete User">
                    <HiOutlineTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;