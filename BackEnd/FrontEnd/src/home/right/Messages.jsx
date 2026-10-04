import React from 'react'
import { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../context/useGetMessages.js'
import Loading from '../../components/Loading.jsx'
import UseGetSocketMessage from '../../context/UseGetSocketMessage.jsx';

export default function Messages() {
    const { messages, loading } = useGetMessages();
    UseGetSocketMessage();
    console.log(messages);

    const lastSeenMessage = useRef();

    useEffect(() => {
        setTimeout(() => {
            if (lastSeenMessage.current) {
                lastSeenMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 100);
    }, [messages]);

    return (
        <>
            {loading ? (<Loading />) : (messages.length > 0 && messages.map((message) => {
                return <div key={message._id} ref={lastSeenMessage}>
                    <Message message={message} />
                </div>

            }))}
            <div style={{ minHeight: "calc(92vh - 9vh)" }} >
                {!loading && messages.length === 0 && <p className="text-center mt-[20%]">No messages yet!! Start a conversation.</p>}

            </div>
        </>
    )
}
