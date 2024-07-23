import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, doc, addDoc, serverTimestamp, query, orderBy, getDocs, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useChats } from '../GLOBAL/contexts/ChatsContext';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const { chatroomId } = useParams();
  const { user: currUser } = useAuthUser();
  const { fetchOtherUser, updateLastMessage } = useChats();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);

  const fetchMessages = async (chatroomId) => {
    try {
      const chatroomRef = doc(db, 'Chatroom', chatroomId);
      const messagesRef = collection(chatroomRef, 'Messages');
      const q = query(messagesRef, orderBy('createdAt'));
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMessages(messages);
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchChatroomData = async (chatroomId) => {
        try {
          const chatroomRef = doc(db, 'Chatroom', chatroomId);
          const chatroomDoc = await getDoc(chatroomRef);
          if (chatroomDoc.exists()) {
            const chatroomData = chatroomDoc.data();
            const otherUserData = await fetchOtherUser(chatroomData.Users, currUser.userID);
            setOtherUser(otherUserData);
            await fetchMessages(chatroomId);
          }
        } catch (error) {
          console.error("Error fetching chatroom data:", error);
        }
    };

    fetchChatroomData(chatroomId);
  }, [chatroomId, currUser.userID, fetchOtherUser]);


  const addMessage = async (chatroomId, senderID, content) => {
    try {
      const chatroomRef = doc(db, 'Chatroom', chatroomId);
      const messagesRef = collection(chatroomRef, 'Messages');
      await addDoc(messagesRef, {
        senderID: senderID,
        content: content,
        createdAt: serverTimestamp()
      });
  
      await updateLastMessage(chatroomId, newMessage);
      await fetchMessages(chatroomId);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const deleteMessage = async (chatroomId, messageId) => {
    try {
      if (!chatroomId || !messageId) {
        throw new Error("Chatroom ID or message ID is missing");
      }

      const messageRef = doc(db, 'Chatroom', chatroomId, 'Messages', messageId);
      await deleteDoc(messageRef);

    const updatedMessages = await fetchMessages(chatroomId);

    if (updatedMessages.length > 0) {
      const lastMessage = updatedMessages[updatedMessages.length - 1].content;
      await updateLastMessage(chatroomId, lastMessage);
    } else {
      await updateLastMessage(chatroomId, "");
    }
  } catch (error) {
    console.error("Error deleting message:", error);
  }
};

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (chatroomId && newMessage.trim() !== "") {
      await addMessage(chatroomId, currUser.userID, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-page">
      <h2>Chat</h2>
      <div className="participants">
        <h4>Participants:</h4>
        {otherUser ? (
          <div className="participant"><p><strong>{otherUser.userName}</strong> and <strong>You</strong></p></div>
        ) : (
          <p>Loading participant...</p>
        )}
      </div>
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <p><strong>{msg.senderID === currUser.userID ? 'You' : otherUser?.userName}</strong>: {msg.content}</p>
              <p><em>{msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toString() : 'Sending...'}</em></p>
              {msg.senderID === currUser.userID && (
                <button onClick={() => deleteMessage(chatroomId, msg.id)}>Delete</button>
              )}
            </div>
          ))
        ) : (
          <p>No messages found</p>
        )}
        
      </div>
      <form className="new-message">
        <textarea 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type your message here..."
        />
        <button type="button" onClick={handleSendMessage}>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;