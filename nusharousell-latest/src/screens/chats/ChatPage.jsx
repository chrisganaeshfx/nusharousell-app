import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { useChats } from '../GLOBAL/contexts/ChatsContext';
import { db, auth } from "../../config/firebase";
import ChatList from '../chats/ChatList';
import '../styles/Chats.css';

const ChatPage = () => {
  const { state } = useChats();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (state.chatroomId) {
      const q = query(
        collection(db, "Messages"),
        where("chatroomId", "==", state.chatroomId),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [state.chatroomId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, "Messages"), {
        chatroomId: state.chatroomId,
        senderId: auth.currentUser.uid,
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-page">
      <ChatList />
      <div className="chat-window">
        {state.chatroomId ? (
          <div className="chat-window-container">
            <div className="messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.senderId === auth.currentUser.uid ? "sent" : "received"}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <div className="no-chat-selected">Please select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;