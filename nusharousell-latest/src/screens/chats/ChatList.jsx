import React, { useState, useEffect } from "react";
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { useChats } from '../GLOBAL/contexts/ChatsContext';
import { doc, deleteDoc, updateDoc, arrayRemove} from 'firebase/firestore';
import { db } from '../../config/firebase';
import '../styles/ChatList.css';
import { Link } from 'react-router-dom';

function ChatList () {
  const { user: currUser } = useAuthUser();
  const { chats, fetchChats, fetchOtherUser } = useChats();
  const [userChats, setUserChats] = useState([]);
  const [otherUsers, setOtherUsers] = useState({});

  useEffect(() => {
		fetchChats();
	}, [fetchChats]);

  useEffect(() => {
    if (currUser) {
      const filteredChats = chats.filter((chat) => chat && chat.Users && chat.Users.includes(currUser.userID));
      setUserChats(filteredChats);

      const fetchOtherUsers = async () => {
        const usersData = {};
        for (const chat of filteredChats) {
          const otherUserData = await fetchOtherUser(chat.Users, currUser.userID);
          usersData[chat.chatroomID] = otherUserData ? otherUserData.userName : 'Unknown User';
        }
        setOtherUsers(usersData);
      };

      fetchOtherUsers();
    }
  }, [currUser, chats, fetchOtherUser]);

  const deleteChatroom = async (chatroomId) => {
    try {
      const userRef = doc(db, 'Users', currUser.userID);
      await updateDoc(userRef, {
        userChats: arrayRemove(chatroomId)
      });

      const otherUserId = chats.find(chat => chat.chatroomID === chatroomId)?.Users.find(id => id !== currUser.userID);
      if (otherUserId) {
        const otherUserRef = doc(db, 'Users', otherUserId);
        await updateDoc(otherUserRef, {
          userChats: arrayRemove(chatroomId)
        });
      }

      await deleteDoc(doc(db, 'Chatroom', chatroomId));

      setUserChats(prevChats => prevChats.filter(chat => chat.chatroomID !== chatroomId));
      setOtherUsers(prevUsers => {
        const newUsers = { ...prevUsers };
        delete newUsers[chatroomId];
        return newUsers;
      });
    } catch (error) {
      console.error("Error deleting chatroom:", error);
    }
  };

return (
  <div className="chat-list">
    <h2>My Chats</h2>
    {userChats.length > 0 ? (
      userChats.map(chat => (
        <div key={chat.chatroomID} className="chat-item">
          <Link to={`/chats/${chat.chatroomID}`}> {otherUsers[chat.chatroomID] || 'Loading...'} </Link>
          <p>{chat.lastMessage}</p>
          <button onClick={() => deleteChatroom(chat.chatroomID)}>Delete</button>
        </div>
      ))
    ) : (
      <p>No chats found</p>
    )}
  </div>
);
};

export default ChatList;