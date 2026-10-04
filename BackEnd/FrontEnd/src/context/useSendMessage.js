import { useState } from 'react'
import useConversation from '../stateManage/useConversation.js';
import axios from 'axios'
import { API_URL } from '../config.js';


function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();


    const sendMessage = async (message) => {
        const conversationId = selectedConversation?._id;
        if (!conversationId || !message.trim()) {
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${API_URL}/message/send/${conversationId}`,
                { message },
                { withCredentials: true }
            );
            console.log(res);
            setMessages([...messages, res.data.newMessage]);
        } catch (err) {
            console.error("Error in sending message:", err);
        } finally {
            setLoading(false);
        }

    }
    return { loading, sendMessage };
}

export default useSendMessage