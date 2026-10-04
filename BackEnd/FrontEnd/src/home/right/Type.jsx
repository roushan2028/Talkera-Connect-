import React from 'react'
import {useState} from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';

export default function Type() {
  const {loading,sendMessage} = useSendMessage();
  const [message,setMessage] =useState("");

  return (
    <form className="flex shrink-0 items-center gap-2 bg-slate-600 p-3 sm:gap-4 sm:p-4" onSubmit={(event) => {
      event.preventDefault();
      if (message.trim()) {
        sendMessage(message);
        setMessage("");
      }
    }}>
      <div className="min-w-0 flex-1">
        <input type="text" placeholder="Type here" value={message} className="input w-full rounded-3xl border border-gray-600 bg-slate-800" onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="shrink-0">
        <button type="submit" className="btn btn-circle btn-ghost text-2xl sm:text-3xl" disabled={loading || !message.trim()} aria-label="Send message">
          <IoSend />
        </button>
      </div>
    </form>
  )
}
