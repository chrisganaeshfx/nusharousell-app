import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../styles/ProductDetail.css';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';

export default function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuthUser();
  const [userIsSeller, setUserIsSeller] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'Products', productID);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists) {
          const productData = docSnapshot.data();
          setProduct(productData);
          if (user && productData.sellerID === user.userID) {
            setUserIsSeller(true);
          } else {
            setUserIsSeller(false);
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productID, user]);

  const handleMarkAsReserved = async () => {
    try {
      const productRef = doc(db, 'Products', productID);
      await updateDoc(productRef, {
        productStatus: 'Reserved',
      });
      console.log('Product marked as Reserved successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error marking product as Reserved:', error);
    }
  };

  const handleMarkAsAvailable = async () => {
    try {
      const productRef = doc(db, 'Products', productID);
      await updateDoc(productRef, {
        productStatus: 'Available',
      });
      console.log('Product marked as Available successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error marking product as Available:', error);
    }
  };

  const handleMarkAsSold = async () => {
    try {
      const productRef = doc(db, 'Products', productID);
      await updateDoc(productRef, {
        productStatus: 'Sold',
      });
      console.log('Product marked as Sold successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error marking product as Sold:', error);
    }
  };

  const handleDeleteListing = async () => {
    try {
      const productRef = doc(db, 'Products', productID);
      await deleteDoc(productRef);
      console.log('Product deleted successfully!');
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <div className='product-info'>
        <img src={product.productImage} alt={`${product.productName}`} />
        <div className='product-details'>
          <h4>Item</h4>
          <p>{product.productName}</p>
          <br />
          <h4>Condition</h4>
          <p>{product.productCondition}</p>
          <br />
          <h4>Price</h4>
          <p>{product.productPrice}</p>
          <br />
          <h4>Description</h4>
          <p>{product.productDescription}</p>
          <br />
          <h4>Meet-Up Location</h4>
          <p>{product.productLocation}</p>
          <br />
          <h4>Seller</h4>
          <p>{product.sellerUserName}</p>
          <br />
          <div>
            <h4>Item Status</h4>
            <p>{product.productStatus}</p>
          </div>
          <div className='action-container'>
            {userIsSeller ? (
              <>
                <Link to={`/chats/${productID}`} className='bold-link'>
                  View Chats
                </Link>
                <Link to={`/product/edit/${productID}`} className='action-link'>
                  Edit Listing
                </Link>
                {product.productStatus === 'Reserved' ? (
                  <button className='action-button green-button' onClick={handleMarkAsAvailable}>
                    Mark as Available
                  </button>
                ) : (
                  <button className='action-button light-red-button' onClick={handleMarkAsReserved}>
                    Mark as Reserved
                  </button>
                )}
                <button className='action-button dark-red-button' onClick={handleMarkAsSold}>
                  Mark as Sold
                </button>
                <button className='action-button dark-red-button' onClick={handleDeleteListing}>
                  Delete Listing
                </button>
              </>
            ) : (
              <>
                <Link to={`/chats/${productID}`} className='bold-link'>
                  Chat with Seller
                </Link>
                <Link to={`/like/${productID}`} className='action-link'>
                  Like
                </Link>
              </>
            )}
          </div>
        </div>
        {product.productStatus === 'Sold' && <div className='status-banner sold-banner'>SOLD</div>}
        {product.productStatus === 'Reserved' && <div className='status-banner reserved-banner'>RESERVED</div>}
      </div>
    </>
  );
}
