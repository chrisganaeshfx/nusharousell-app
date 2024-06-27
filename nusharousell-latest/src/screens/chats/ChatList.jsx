import React, { useContext, useState, useEffect } from "react";
import {query, where, collection, getDocs, getDoc } from "firebase/firestore";
import { useChats } from '../GLOBAL/contexts/ChatsContext';
import '../styles/Chat.css';
import { db } from '../../config/firebase';

function ChatList ({user, userDetails}) {
  const [chats, setChats] = useState([]);

  const { dispatch } = useChats();
  
  useEffect(() => {
    const getChats = async () => {
      if (user) {
        const chatroomsRef = collection(db, "Chatroom");
        const q = query(chatroomsRef, where("Users", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);
        const chatDataPromises = querySnapshot.docs.map(async (doc) => {
          const chatroom = doc.data();
          const otherUserId = chatroom.Users.find((uid) => uid !== user.uid);
          
          const otherUserDoc = await getDoc(doc(db, "Users", otherUserId));
          const otherUserInfo = otherUserDoc.exists() ? otherUserDoc.data() : null;
          
          return { id: doc.id, otherUserInfo };
        });

        const chatData = await Promise.all(chatDataPromises);
        setChats(chatData);
      }
    };

    getChats();
  }, [user]);

  const handleSelect = (chat) => {
    dispatch({ type: "SET_CHATROOM_ID", payload: chat.id });
  };

  return (
    <div className="chats-list">
      {chats.map((chat) => (
        <div key={chat.id} className="chat-list-item" onClick={() => handleSelect(chat)}>
          {chat.otherUserInfo ? (
            <>
              <img src={chat.otherUserInfo.image} alt="User" />
              <div className="chat-info">
                <span>{chat.otherUserInfo.userName}</span>
              </div>
            </>
          ) : (
            <div className="chat-info">
              <span>Loading...</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;

/*
Room - roomID - stores the user id of the two users in chat
Messages - stores all messages between the two users

when chat with seller pressed, redirect to  chatroom
ideally to have a default popup of the product buyer is interested in, and a message 'I would like to buy this product'

if buyer-seller chatroom exists, route to the room using room id, else create new room
show all chats at the side, ideally to display most recent message
if message unread -> create notif

*/
