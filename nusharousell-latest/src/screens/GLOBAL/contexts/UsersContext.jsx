import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// create context
export const UsersContext = createContext();

// create custom hook to use UsersContext
export function useUsers() {
  return useContext(UsersContext);
}

// context provider
export const UsersProvider = ({ children }) => {
  // defining useState variables
  const [users, setUsers] = useState([]);
  const [cachedUsers, setCachedUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for initial fetch

  // Function to fetch users from Firestore
  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true before fetching

      // Check if users are already cached
      if (cachedUsers.length > 0) {
        setUsers(cachedUsers);
        setLoading(false); // Set loading to false as data is already available
        return;
      }

      const usersRef = collection(db, 'Users');
      const querySnapshot = await getDocs(usersRef);
      const usersData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }));
      
      setUsers(usersData);
      setCachedUsers(usersData); // Cache users for future use
      setLoading(false);

      // ! FOR DEBUGGING PURPOSES
      console.log('Users successfully fetched:', usersData);
      console.log('Users cached:', cachedUsers);

    } catch (err) {
      console.error('Error fetching users:', err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Default fetch on mount
  }, []);

  return (
    <UsersContext.Provider value={{ users, fetchUsers, loading }}>
      {children}
    </UsersContext.Provider>
  );
};
