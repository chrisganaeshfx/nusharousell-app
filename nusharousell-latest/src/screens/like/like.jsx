import React, { useState, useEffect } from 'react';
import { doc, getDoc} from 'firebase/firestore';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import '../styles/Like.css';

export default function LikedProducts() {
    const {user} = useAuthUser();
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        const fetchLikedProducts = async() =>{
            try{
                if (user) {
                    const userDocRef = doc(db, 'Users', user.userID);
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const likedProductIDs = userData.userLike || [];
                        const productRefs = likedProductIDs.map((productID) => doc(db, 'Products', productID));
                        const productSnapshots = await Promise.all(productRefs.map((ref) => getDoc(ref)));

                        const likedProductsData = productSnapshots.map((snapshot) => snapshot.data());
                        setLikedProducts(likedProductsData);
                    }
                }
                } catch (error) {
                console.error('Error fetching liked products:', error);
                }
            };

        fetchLikedProducts();
        }, [user]);
                
    return (
        <div className="liked-products-container">
            <h2>Liked Products</h2>
            {likedProducts.length === 0 ? (
            <p>No liked products yet.</p>
            ) : (
            <div className="liked-products-list">
                {likedProducts.map((product) => (
                <div key={product.productID} className="product-card">
                    <figure>
                    <Link to={`/userprofile/view/${product.sellerID}`}>
                        <div className='user-info'>
                        <img
                            src={product.sellerImageUrl}
                            alt={product.sellerUserName}
                            className='user-image'
                        />
                        <span>@{product.sellerUserName}</span>
                        </div>
                    </Link>
                    <Link to={`/product/view/${product.productID}`}>
                    <div className='product-image-container'>
                    <img src={product.productImageUrl} alt={product.productName} className = 'product-image' />
                    </div>
                    <figcaption className="product-info">
                        {product.productName}<br/>
                        S${product.productPrice}<br/>
                        {product.productCondition}<br/>
                    </figcaption>
                    </Link>
                    </figure>
                </div>
                ))}
            </div>
            )}
        </div>
    );
}
