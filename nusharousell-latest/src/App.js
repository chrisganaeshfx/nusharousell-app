import React, { useState, useEffect } from 'react';
import { auth, db } from './config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserProvider from './screens/GLOBAL/contexts/UserContext';
// import ProductsProvider from './screens/GLOBAL/contexts/ProductsContext';
import Homepage from './screens/homepage/Homepage';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import AddProduct from './screens/sell/AddProduct';
import ProductDetail from './screens/productpage/ProductDetail';
import Profile from './screens/profile/Profile';
import EditProfile from './screens/profile/EditProfile';
import Chat from './screens/chats/Chat';
import Test from './screens/test/Test';
import {ProductsContextProvider} from './screens/GLOBAL/components/ProductsContext';


export default function App() {
	const [product, setProduct] = useState([]);
  /* TODO
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);
  const userDetails = useContext(UserDetailsContext);
  const setUserDetails = useContext(SetUserDetailsContext);
  */
	const [user, setUser] = useState(null);
	const [userDetails, setUserDetails] = useState(null);
	const [error, setError] = useState(null);
	/* *******SEARCHING PRODUCT********
  const searchproduct = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  */

	const fetchUser = async () => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const userDoc = doc(db, 'Users', user.uid);
					const docSnapshot = await getDoc(userDoc);
					const userDetails = docSnapshot.data();
					setUser(user);
					setUserDetails(userDetails);
					// to obtain userId: use
					// const userId = user.uid;
					// to obtain userDetails: use
					// const getUserDetails = async () => {
					// const userDoc = doc(db, "Users", user.uid)
					// const docSnapshot = await getDoc(userDoc)
					// const userDetails = docSnapshot.data();
					console.log('Current user:', user);
					console.log('Current user details:', userDetails);
					setError(null);
				} catch (err) {
					setError(err.message);
					// To place somewhere!!
					// {error && <span className='error-msg'>{error}</span>}
				}
			}
		});
	};

	// Use useEffect to call fetchData when the component mounts
	useEffect(() => {
		fetchUser();
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	return (
		<Router>
			<div className='App'>
			<ProductsContextProvider>
				<Routes>
					<Route
						path='/'
						element={
							<Homepage
								userDetails={userDetails}
								setUserDetails={setUserDetails}
							/>
						}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/signup'
						element={<Signup />}
					/>
					<Route
						path='/addproduct'
						element={
							<AddProduct
								user={user}
								userDetails={userDetails}
								product={product}
								setProduct={setProduct}
							/>
						}
					/>
					<Route
						path='/productdetail/:productID'
						element={<ProductDetail
								user={user}
								userDetails={userDetails}
								product={product}
								setProduct={setProduct} 
							/>
						}
					/>
					<Route
						path='/chat'
						element={<Chat user={user} />}
					/>
					<Route
						path='/profile'
						element={
							<Profile
								user={user}
								userDetails={userDetails}
							/>
						}
					/>
					<Route
						path='/profile/edit'
						element={
							<EditProfile
								user={user}
								userDetails={userDetails}
							/>
						}
					/>
					<Route
						path='*'
						element={<h1>Error 404: Your Mother Not Found</h1>}
					/>
          <Route 
            path='/test'
            element={<Test />}
          />
				</Routes>
				</ProductsContextProvider>
			</div>
		</Router>
	);
}
