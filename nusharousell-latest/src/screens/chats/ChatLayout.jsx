import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from '../chats/ChatList';
import '../styles/Chat.css';

export default function ChatLayout() {
  return (
    <div className="chat-layout">
      <ChatList />
      <div className="chat-page">
        <Outlet />
      </div>
    </div>
  );
}