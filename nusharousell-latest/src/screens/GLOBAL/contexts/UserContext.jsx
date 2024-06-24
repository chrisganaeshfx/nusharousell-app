import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// create context
const UserContext = createContext();

// Custom hook to use UserProvider
export const useUser = () => {
	return useContext(UserContext);
};

// UserProvider component
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

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
				} catch (err) {
					console.error('Error fetching user:', err.message);
				}
			} else {
				console.log('No user logged in');
				setUser(null);
			}
		});
	};

	// Fetch user on component mount
	useEffect(() => {
		fetchUser();
	}, []);

	// Value object for context provider
	const value = { user , setUser };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
