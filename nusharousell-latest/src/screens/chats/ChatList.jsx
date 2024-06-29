import React, { useState, useEffect } from "react";
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { useChats } from '../GLOBAL/contexts/ChatsContext';
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

return (
  <div className="chat-list">
    <h2>My Chats</h2>
    {userChats.length > 0 ? (
      userChats.map(chat => (
        <div key={chat.chatroomID} className="chat-item">
          <Link to={`/chats/${chat.chatroomID}`}> {otherUsers[chat.chatroomID] || 'Loading...'} </Link>
          <p>{chat.lastMessage}</p>
        </div>
      ))
    ) : (
      <p>No chats found</p>
    )}
  </div>
);
};

export default ChatList;