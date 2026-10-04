import React, { useState } from 'react'
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import { API_URL } from '../../config.js';

export default function Logout() {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_URL}/chat/logout`, {
        withCredentials: true
      });
      localStorage.removeItem("chat");
      setAuthUser(undefined);
      // navigate("/login");
      toast.success("LogOut Successfully")
    } catch (err) {
      console.log(err);
      toast.error("error in logout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex w-14 shrink-0 flex-col justify-end bg-gray-800 text-white sm:w-16">
        <button
          type="button"
          aria-label="Log out"
          disabled={loading}
          className="mb-5 self-center rounded-lg p-2 transition-colors hover:bg-gray-600"
          onClick={handleLogout}
        >
          <CiLogout className="text-3xl sm:text-4xl" />
        </button>

      </div>
    </>
  )
}
