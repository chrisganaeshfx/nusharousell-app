import React, {useEffect, useState} from "react";
import{useParams} from 'react-router-dom';
import {db} from '../../config/firebase';
import "../styles/ProductDetail.css";
import { FaRegHeart } from "react-icons/fa";
import { doc, collection } from 'firebase/firestore';

export default function ProductDetail() {
  const {productID} = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const docRef = await db.collection("Products").doc(productID).get();
        if (docRef.exists){
          setProduct(docRef.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productID]
);

  if (!product){
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <div className="product-info">
        <img src={product.productImage} alt="Image Not Available" />
        <div className="product-details">
          <h4> Item </h4>
          <p> {product.productName} </p>
          <br />
          <h4> Condition </h4>
          <p> {product.productCondition} </p>
          <br />
          <h4> Price </h4>
          <p> {product.productPrice} </p>
          <br />
          <h4> Description </h4>
          <p> {product.productDescription} </p>
          <br />
          <h4> Meet-Up Location </h4>
          <p> {product.productLocation} </p>
          <br />
          <h4> Seller </h4>
          <p> {product.sellerUserName} </p>
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
