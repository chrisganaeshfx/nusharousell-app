import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { db } from '../../../config/firebase';
import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore';

// create context
export const ChatsContext = createContext();

// generate custom hook
export function useChats() {
  return useContext(ChatsContext);
};
export const ChatsProvider = ({ children }) => {
	const [chats, setChats] = useState([]);
  	const [cachedChats, setCachedChats] = useState([]);
  	const [loading, setLoading] = useState(true); // Loading state for initial fetch

  // Function to fetch chats from Firestore
  const fetchChats = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching

      if (cachedChats.length > 0) {
        setChats(cachedChats);
        setLoading(false); 
        return;
      }

      const chatsRef = collection(db, 'Chatroom');
      const querySnapshot = await getDocs(chatsRef);
      const chatsData = querySnapshot.docs.map(doc => ({
		chatroomID: doc.id,
        ...doc.data()
      }));
      
      setChats(chatsData);
      setCachedChats(chatsData);
      setLoading(false);

      console.log('Chats successfully fetched:', chatsData);
      console.log('Chats cached:', cachedChats);

    } catch (err) {
      console.error('Error fetching chats:', err.message);
      setLoading(false);
    }
  }, [cachedChats]);

  const getOtherUserID = (userIDs, currentUserID) => {
    return userIDs.find(id => id !== currentUserID);
  };

  // Function to fetch the other user's data
  const fetchOtherUser = async (userIDs, currentUserID) => {
    const otherUserID = getOtherUserID(userIDs, currentUserID);
    if (otherUserID) {
      const otherUserRef = doc(db, 'Users', otherUserID);
      const otherUserDoc = await getDoc(otherUserRef);
      if (otherUserDoc.exists()) {
        return otherUserDoc.data();
      }
    }
    return null;
  };

  const updateLastMessage = async (chatroomId, newMessage) => {
    try {
      const chatroomRef = doc(db, 'Chatroom', chatroomId);
      await setDoc(chatroomRef, {
        lastMessage: newMessage
      }, { merge: true });
      
      fetchChats();
    } catch (error) {
      console.error('Error updating last message:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <ChatsContext.Provider value={{ chats, fetchChats, loading, getOtherUserID, fetchOtherUser, updateLastMessage }}>
      {children}
    </ChatsContext.Provider>
  );
};
