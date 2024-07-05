import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc, deleteDoc, query, collection, where, getDocs, serverTimestamp, addDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import '../styles/ProductDetail.css';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { useChats } from '../GLOBAL/contexts/ChatsContext';
import { FaHeart } from 'react-icons/fa';

export default function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuthUser();
  const [userIsSeller, setUserIsSeller] = useState(false);
  const { fetchChats } = useChats();
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();

  console.log('productID: ', productID);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'Products', productID);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists) {
          const productData = docSnapshot.data();
          setProduct(productData);
          console.log('Product fetched successfully:', productData);
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

  const handleChatClick = async () => {
    if (!user || !product) return;

    try {
      const currentUserID = user.userID;
      const otherUserID = product.sellerID;

      // Query to find chatroom where Users array contains the current user ID
      const q = query(
        collection(db, 'Chatroom'),
        where('Users', 'array-contains', currentUserID)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      let foundChatroom = null;

      // Check each document to see if it also contains the other user ID
      querySnapshot.forEach((doc) => {
        const chatroom = doc.data();
        if (chatroom.Users.includes(otherUserID)) {
          foundChatroom = doc.id;
        }
      });

      if (foundChatroom) {
        navigate(`/chats`); 
      } else {
        // Create a new chatroom if not found
        const newChatData = {
          Users: [currentUserID, otherUserID],
          createdAt: serverTimestamp(),
          lastMessage: ""
        };

        const newChatroomRef = await addDoc(collection(db, 'Chatroom'), newChatData);
        const chatroomID = newChatroomRef.id;

        const chatroomRef = doc(db, 'Chatroom', chatroomID);
        await setDoc(chatroomRef, { ...newChatData, chatroomID });

        const userDocRef = doc(db, 'Users', currentUserID);
        const sellerDocRef = doc(db, 'Users', otherUserID);

        await updateDoc(userDocRef, {
          userChats: arrayUnion(chatroomID),
        });

        await updateDoc(sellerDocRef, {
          userChats: arrayUnion(chatroomID),
        });

        fetchChats(); // Refresh chats after creating a new chatroom
        navigate(`/chats/${chatroomID}`); // Navigate to the new chatroom
      }
    } catch (error) {
      console.error("Error checking or creating chatroom:", error);
    }
  };

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (user) {
        const userRef = doc(db, 'Users', user.userID);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setLikedProducts(userData.userLike || []);
        }
      }
    };
    fetchLikedProducts();
  }, [user]);

  const handleLikeClick = async (productID) => {
    if (!user) return; // Ensure user is logged in

    const userRef = doc(db, 'Users', user.userID);
    const isLiked = likedProducts.includes(productID);

    try {
      if (isLiked) {
        await updateDoc(userRef, {
          userLike: arrayRemove(productID),
        });
        setLikedProducts((prev) => prev.filter((id) => id !== productID));
        console.log('Product unliked successfully!');
      } else {
        await updateDoc(userRef, {
          userLike: arrayUnion(productID),
        });
        setLikedProducts((prev) => [...prev, productID]);
        console.log('Product marked as liked successfully!');
      }
    } catch (error) {
      console.error('Error updating liked products:', error);
    }
  };

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
      window.location.href = `/userprofile/view/${user.userID}`;
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
        <img src={product.productImageUrl} alt={`${product.productName}`} />
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
                <button onClick={handleChatClick} className='bold-link'>
                  View Chats
                </button>
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
                <button onClick={handleChatClick} className='bold-link'>
                  Chat with Seller
                </button>
                <button
                onClick={() => handleLikeClick(productID)}
                className={`like-button ${likedProducts.includes(productID) ? 'liked' : ''}`}>
                <FaHeart className="heart-icon" />
              </button>
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
