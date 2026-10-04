import { useEffect } from 'react';
import { useSocket } from './SocketContext.jsx';
import useConversation from '../stateManage/useConversation.js';
import sound from '../assets/notificationsound.mp4';

function UseGetSocketMessage() {
    const { socket } = useSocket();
    const setMessages = useConversation((state) => state.setMessages);

    useEffect(() => {
        if (!socket) return;
        const notification = new Audio(sound);
        notification.play();

        const handleNewMessage = (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);

        };

        socket.on("newMessage", handleNewMessage);
        return () => {
            socket.off("newMessage", handleNewMessage);
        }
    }, [socket, setMessages]);
}

export default UseGetSocketMessage;