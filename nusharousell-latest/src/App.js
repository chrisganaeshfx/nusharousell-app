import React from 'react';
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
import EditProduct from './screens/sell/EditProduct';
import Chat from './screens/chats/Chat';
import { ProductsProvider } from './screens/GLOBAL/contexts/ProductsContext';
import { UserProvider } from './screens/GLOBAL/contexts/UserContext';


export default function App() {
	/* *******SEARCHING PRODUCT********
  const searchproduct = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  */

	return (
		<Router>
			<div className='App'>
      <UserProvider>
			<ProductsProvider>
				<Routes>
					<Route
						path='/'
						element={<Homepage/>}
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
						path='/product/add'
						element={<AddProduct/>}
					/>
					<Route
						path='/product/view/:productID'
						element={<ProductDetail/>}
					/>
					<Route
						path='/product/edit/:productID'
						element={<EditProduct/>}
					/>
					<Route
						path='/chat'
						element={<Chat />}
					/>
					<Route
						path='/userprofile/view/:userID'
						element={<Profile/>}
					/>
					<Route
						path='/userprofile/edit/:userID'
						element={<EditProfile/>}
					/>
					<Route
						path='*'
						element={<h1>Error 404: Your Mother Not Found</h1>}
					/>
				</Routes>
				</ProductsProvider>
        </UserProvider>
			</div>
		</Router>
	);
}
