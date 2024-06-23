import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';


// create context
const UserContext = createContext();
const SetUserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};
export const useSetUser = () => {
  return useContext(SetUserContext);
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user details from Firebase
  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, 'Users', user.uid);
          const docSnapshot = await getDoc(userDoc);
          const userData = docSnapshot.data();
          setUser({
            userID: user.uid, // Add user's uid to userDetails
            ...userData,
          });
          console.log('User successfully added to state:', user);
          setError(null);
        } catch (err) {
          console.error('Error fetching user:', err.message);
          setError(err.message);
          setUser(null);
        }
      } else {
        console.log("No user logged in");
        setUser(null);
        setError(null);
      }
    });
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Value object for context provider

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  )
}