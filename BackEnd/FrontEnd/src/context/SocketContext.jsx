import { createContext, useEffect, useState ,useContext} from "react";
import { useAuth } from "./AuthProvider.jsx";
import { io } from "socket.io-client";
import { API_URL } from '../config.js';

const socketContext = createContext();

export const useSocket = () =>{
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { authUser } = useAuth();


    useEffect(() => {
        if (!authUser?.user?.id) {
            setSocket(null);
            return;
        }

        const socket = io(API_URL, {
            query: {
                userId: authUser.user.id,
            }
        });

        socket.on("getonlineusers",(users)=>{
            setOnlineUsers(users);
        })

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    },[authUser])

    return(
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    )

}
