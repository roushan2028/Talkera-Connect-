import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import Type from './Type'
import { IoMenu } from "react-icons/io5";
import useConversation from '../../stateManage/useConversation.js';

function NoChat() {
  const authUser = JSON.parse(localStorage.getItem("chat"));
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 items-center justify-center bg-gray-800 text-white">
      <h1 className="text-center text-xl font-semibold">
       { `Welcome, ${authUser.user.name || "User"}!`}  <br/> Select a chat to start messaging.
      </h1>
    </div>
  );
}

export default function Right({ onOpenSidebar }) {
  const {selectedConversation} = useConversation();
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
     {!selectedConversation ? (
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center bg-gray-700 p-2 lg:hidden">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onOpenSidebar}>
            <IoMenu aria-hidden="true" /> Chats
          </button>
        </div>
        <NoChat />
      </div>
     ) :(<div className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-gray-800 text-white">
      <div className="flex shrink-0 items-center bg-gray-700 p-2 lg:hidden">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onOpenSidebar}>
          <IoMenu aria-hidden="true" /> Chats
        </button>
      </div>
      <ChatUser id={selectedConversation?._id} name={selectedConversation?.name || 'User'}/>
      <div className='my-2 min-h-0 flex-1 overflow-y-auto'>
        <Messages/>
      </div>
      <Type/>
    </div>)}
    </div>
  )
}
