import React from 'react';

export default function Message({ message }) {
    const authUser = JSON.parse(localStorage.getItem("chat"));
    const isMe = authUser.user.id === message.senderId;
    const chatName = isMe ? "chat chat-end" : "chat chat-start";
    const chatBubbleClass = isMe
        ? "chat-bubble chat-bubble-info"
        : "chat-bubble chat-bubble-neutral";
    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className={chatName}>
            <div className={chatBubbleClass}>{message.message}</div>
            <div className="chat-footer">{formattedTime}</div>
        </div>
    );
}
