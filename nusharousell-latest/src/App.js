import React, { useState } from "react";
import { auth, firestore } from './config/firebase';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./screens/homepage/Homepage";
import { Login } from "./screens/auth/Login";
import { Signup } from "./screens/auth/Signup";
import { NewProduct } from "./screens/sell-product/AddProduct";
import { ProductDetail } from "./screens/product-view/ProductDetail";
import { Chat } from "./screens/chats/Chat";

export default function App() {
  const [product, setProduct] = useState([]);
  const searchproduct = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/screens/sell-product/AddProduct"
            element={<NewProduct product={product} setProduct={setProduct} />}
          />
          <Route
            path="/screens/product-view/ProductDetail"
            element={<ProductDetail />}
          />
          <Route path="/screens/chats/Chat" element={<Chat />} />
          
        </Routes>
      </div>
    </Router>
  );
}
