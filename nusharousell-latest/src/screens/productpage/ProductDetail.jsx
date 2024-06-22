import React, {useEffect, useState} from "react";
import{useParams} from 'react-router-dom';
import {db} from '../../config/firebase';
import "../styles/ProductDetail.css";
import { FaRegHeart } from "react-icons/fa";
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const {productID} = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const docRef = doc(db, "Products", productID);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists){
          setProduct(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productID]);

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
          <Link to="/chat">Chat with seller</Link>
          <Link to="/"><FaRegHeart /></Link>
        </div>
      </div>
    </>
  );
}
