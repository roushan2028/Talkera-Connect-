import React from 'react'
import Search from './Search'
import Users from './Users'
import { useAuth } from '../../context/AuthProvider'

export default function Left({ onUserSelected }) {
  const authUser = JSON.parse(localStorage.getItem("chat"));
  const displayName = authUser?.user?.name ?? 'User';
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-black text-white">
      <div className="border-b border-white/10 px-4 pb-3 pt-4">
        <h1 className="text-2xl font-bold">Talkera Connect </h1>
        <div className="mt-4 flex min-w-0 items-center gap-3 rounded-md bg-gray-800 px-3 py-3">
          <div className="avatar avatar-online shrink-0">
            <div className="flex size-12 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              <span aria-hidden="true">{initials}</span>
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">{authUser.user.name}</h2>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>
      </div>
      <Search onUserSelected={onUserSelected} />
      <hr></hr>
      <Users onUserSelected={onUserSelected} />
    </div>
  )
}
