import React from 'react'
import useConversation from '../../stateManage/useConversation.js';
import { useSocket } from '../../context/SocketContext.jsx';

export default function User({ user, onUserSelected }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocket();
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <button
      type="button"
      className={`w-full text-left ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => {
        setSelectedConversation(user);
        onUserSelected?.();
      }}
    >
      <div className="flex h-20 items-center gap-4 px-4 py-3 transition-colors duration-300 hover:bg-slate-600 sm:px-8">
        <div className={`avatar ${isOnline ? 'avatar-online':''}`}>
          <div className="w-12 rounded-full sm:w-16">
            <img alt="Tailwind-CSS-Avatar-component" src="https://thumbs.dreamstime.com/z/anime-boy-avatar-ai-generative-art-man-273239994.jpg" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </button>
  )
}
