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
import { ProductsProvider } from './screens/GLOBAL/contexts/ProductsContext';
import { UserProvider } from './screens/GLOBAL/contexts/UserContext';


export default function App() {
	const [product, setProduct] = useState([]);
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
						path='/addproduct'
						element={
							<AddProduct
								product={product}
								setProduct={setProduct}
							/>
						}
					/>
					<Route
						path='/productdetail/:productID'
						element={<ProductDetail
								product={product}
								setProduct={setProduct} 
							/>
						}
					/>
					<Route
						path='/chat'
						element={<Chat />}
					/>
					<Route
						path='/profile'
						element={
							<Profile/>
						}
					/>
					<Route
						path='/profile/edit'
						element={
							<EditProfile/>
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
				</ProductsProvider>
        </UserProvider>
			</div>
		</Router>
	);
}
