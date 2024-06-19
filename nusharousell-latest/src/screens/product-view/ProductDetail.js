import React from "react";
import Navbar from "../global/components/Navbar";
import image from "../global/assets/product-images/images.png";
import "./ProductDetail.css";
import { FaRegHeart } from "react-icons/fa";
//
function ProductDetail() {
  return (
    <>
      <Navbar />
      <br />
      <div className="product-info">
        <img src={image} alt="recco1" />
        <div className="product-details">
          <h4> Item </h4>
          <p> abc </p>
          <br />
          <h4> Condition </h4>
          <p> abc </p>
          <br />
          <h4> Price </h4>
          <p> abc </p>
          <br />
          <h4> Description </h4>
          <p> abc </p>
          <br />
          <h4> Meet-Up Location </h4>
          <p> abc </p>
          <br />
          <h4> Seller </h4>
          <p> abc </p>
          <br />
          <a href="/Screens/chats/Chat">Chat with Seller</a>
          <button>
            {" "}
            <FaRegHeart />{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export { ProductDetail };
