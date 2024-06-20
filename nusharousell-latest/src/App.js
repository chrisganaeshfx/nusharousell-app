import React, { useState, useEffect } from "react";
import { auth, db } from './config/firebase';
import { doc, getDoc } from "firebase/firestore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/homepage/Homepage";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import AddProduct from "./screens/sell-product/AddProduct";
import ProductDetail from "./screens/product-view/ProductDetail";
import Profile from "./screens/profile/Profile";
import Chat from "./screens/chats/Chat";

export default function App() {
  
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  /* *******SEARCHING PRODUCT********
  const searchproduct = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  */
  
  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        try {
          const docSnapshot = await getDoc(doc(db, "Users", user.uid));
          setUser(docSnapshot.data());
          console.log(docSnapshot.data());
          setError(null);
        } catch(err) {
          setError(err.message);
          // To place somewhere!!
          // {error && <span className='error-msg'>{error}</span>} 
        }
      }
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={<AddProduct user={user} product={product} setProduct={setProduct} />}/>
          <Route path="/productdetail" element={<ProductDetail />}/>
          <Route path="/chat" element={<Chat user={user}/>} />
          <Route path="/profile" element={<Profile user={user}/>}/>
        </Routes>
      </div>
    </Router>
  );
}
