import { useState, useEffect } from 'react'
import axios from 'axios';
import useConversation from '../stateManage/useConversation.js';
import { API_URL } from '../config.js';

export default function useGetMessages() {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            const conversationId = selectedConversation?._id;
            if (!conversationId) {
                setMessages([]);
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${API_URL}/message/get/${conversationId}`,
                    { withCredentials: true }
                );
                setMessages(Array.isArray(res.data.message) ? res.data.message : []);
            } catch (err) {
                console.error("Error in getting messages:", err);
            } finally {
                setLoading(false);
            }


        }
        getMessages();

    }, [selectedConversation?._id, setMessages]);

    return {
        messages,
        loading
    }
}
