import React, { useState } from "react"
import Left from "./home/left/Left"
import Right from "./home/right/Right"
import Logout from "./home/left1/Logout"
import SignUp from "./components/SignUp"
import LoginIn from "./components/LoginIn"
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthProvider";
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* <Loading/> */}
      <Routes>
        <Route path="/" element={
          authUser ? <div className="drawer h-dvh w-full lg:drawer-open">
            <input
              id="chat-sidebar"
              type="checkbox"
              className="drawer-toggle"
              checked={drawerOpen}
              onChange={(event) => setDrawerOpen(event.target.checked)}
            />
            <div className="drawer-content flex h-dvh min-w-0 overflow-hidden">
              <Right onOpenSidebar={() => setDrawerOpen(true)} />
            </div>
            <div className="drawer-side z-40">
              <label htmlFor="chat-sidebar" aria-label="Close chat sidebar" className="drawer-overlay" />
              <div className="flex h-full w-[min(90vw,24rem)] lg:w-[34vw]">
                <Logout />
                <Left onUserSelected={() => setDrawerOpen(false)} />
              </div>
            </div>
          </div> : (<Navigate to={"/login"} />)
        } />
        <Route path="/signup" element={ authUser ? <Navigate to={"/"}/> : <SignUp />} />
        <Route path="/login" element={ authUser ? <Navigate to={"/"}/> : <LoginIn />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
