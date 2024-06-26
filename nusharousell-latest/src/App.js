import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductsProvider } from './screens/GLOBAL/contexts/ProductsContext';
import { AuthUserProvider } from './screens/GLOBAL/contexts/AuthUserContext';
import { UsersProvider } from './screens/GLOBAL/contexts/UsersContext';
// auth and homepages
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import Homepage from './screens/homepage/Homepage';
// product pages
import AddProduct from './screens/sell/AddProduct';
import ProductDetail from './screens/productpage/ProductDetail';
import EditProduct from './screens/sell/EditProduct';
// user profile pages
import Profile from './screens/profile/Profile';
import EditProfile from './screens/profile/EditProfile';
// chat
import Chat from './screens/chats/Chat';

export default function App() {
	/* *******SEARCHING PRODUCT********
  const searchproduct = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  */

	return (
		<Router>
			<div className='App'>
				<AuthUserProvider>
					<UsersProvider>
						<ProductsProvider>
							<Routes>
								<Route
									path='/signup'
									element={<Signup />}
								/>
								<Route
									path='/login'
									element={<Login />}
								/>
								<Route
									path='/'
									element={<Homepage />}
								/>
								<Route
									path='/product/add'
									element={<AddProduct />}
								/>
								<Route
									path='/product/view/:productID'
									element={<ProductDetail />}
								/>
								<Route
									path='/product/edit/:productID'
									element={<EditProduct />}
								/>
								<Route
									path='/userprofile/view/:userID'
									element={<Profile />}
								/>
								<Route
									path='/userprofile/view/:sellerID'
									element={<Profile />}
								/>
								<Route
									path='/userprofile/edit/:userID'
									element={<EditProfile />}
								/>
								<Route
									path='/chat'
									element={<Chat />}
								/>
								<Route
									path='*'
									element={<h1>Error 404: Page not found</h1>}
								/>
							</Routes>
						</ProductsProvider>
					</UsersProvider>
				</AuthUserProvider>
			</div>
		</Router>
	);
}
