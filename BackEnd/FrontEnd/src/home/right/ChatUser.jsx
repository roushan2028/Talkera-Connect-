import React from 'react'
import {useSocket}  from '../../context/SocketContext.jsx';

export default function ChatUser({name,id}) {
    const { onlineUsers } = useSocket();
    const isOnline = onlineUsers.includes(id);

    return (
        <div className="flex min-w-0 items-center gap-3 bg-gray-700 px-4 py-3 transition-colors duration-300 hover:bg-slate-500 sm:gap-4 sm:px-5">
                <div className={`avatar shrink-0 ${isOnline ? 'avatar-online' : ''}`}>
                    <div className="w-12 rounded-full sm:w-16">
                        <img alt="Tailwind-CSS-Avatar-component" src="https://thumbs.dreamstime.com/z/anime-boy-avatar-ai-generative-art-man-273239994.jpg" />
                    </div>
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-lg sm:text-xl">{name}</h1>
                    <span className='text-sm'>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
        </div>
    )
}
