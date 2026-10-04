import React from 'react'
import { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import userGetAllUsers from '../../context/userGetAllUser.jsx';
import useConversation from '../../stateManage/useConversation.js';

export default function Search({ onUserSelected }) {
    const [search, setSearch] = useState("");
    const [allUsers] = userGetAllUsers();
    const { setSelectedConversation } = useConversation();

    return (
        <div className='h-[8vh]'>
            <form onSubmit={(e) => {
                e.preventDefault();

                const query = search.trim().toLowerCase();
                if (!query) return;

                const conversation = allUsers.find((user) =>
                    user.name?.toLowerCase().includes(query)
                );

                if (conversation) {
                    setSelectedConversation(conversation);
                    setSearch("");
                    onUserSelected?.();
                } else {
                    toast.error("User not found");
                }
            }}
            >
            <div className='p-2'><label className="input w-[100%] ">

                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                </svg>
                <input type="search" required placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <IoSearchSharp className='text-3xl hover:bg-gray-600 rounded-full duration-300' />

            </label></div>
        </form>
        </div >
    )
}
