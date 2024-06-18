import "./styles.css";
import React, { useState } from "react";
import { Home } from "./Screens/Homepage/Homepage";
import { NewProduct } from "./Screens/NewProductListing/AddProduct";
import { ProductDetail } from "./Screens/Productpg/ProductDetail";
import { Chat } from "./Screens/Chats/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Route
            path="/Screens/NewProductListing/AddProduct"
            element={<NewProduct product={product} setProduct={setProduct} />}
          />
          <Route
            path="/Screens/Productpg/ProductDetail"
            element={<ProductDetail />}
          />
          <Route path="/Screens/Chats/Chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}
