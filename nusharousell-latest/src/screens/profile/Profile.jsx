import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaStar, FaSchool } from 'react-icons/fa';
import { useUser } from '../GLOBAL/contexts/UserContext';
import { useProducts } from '../GLOBAL/contexts/ProductsContext';

import '../styles/Profile.css'; // Keep general profile styles
import '../styles/ProductList.css'; // Use product card styles from ProductList.css

export default function Profile() {
    const { user } = useUser();
    const { products, fetchProducts } = useProducts();
    const [userProducts, setUserProducts] = useState([]);
    
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (user && products) {
            const filteredProducts = products.filter((product) => product.sellerID === user.userID);
            setUserProducts(filteredProducts);
        }
    }, [user, products]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile-page'>
            <div className='profile-column'>
                <div className='avatar'>
                    {user.image && (
                        <img
                            src={user.image}
                            alt={`${user.userName}'s profile-pic`}
                        />
                    )}
                </div>
                <h3>@{user.userName}</h3>
                <p>
                    <IoMdMail />: {user.email}
                </p>
                <p>
                    <FaPhoneAlt />: +65 {Number(user.phoneNumber)}
                </p>
                <p>
                    <FaStar />: {user.rating}/5.0
                </p>
                <p>
                    <FaSchool />: {user.meetupLocation}
                </p>
                <Link to={'/userprofile/edit/`${user.userID}`'}>
                    Edit Profile
                </Link>
            </div>
            <div className='listing-column'>
                <h2>My Listings</h2>
                <div className='product-list-container'> {/* Use product-list-container from ProductList.css */}
                    <div className='product-list'>
                        {userProducts.length > 0 ? (
                            userProducts.map((userproduct) => (
                                <div key={userproduct.productID} className="product-card">
                                    <figure>
                                        <Link to={`/product/view/${userproduct.productID}`}>
                                            <img
                                                src={userproduct.productImage}
                                                alt={`${userproduct.productName}`}
                                            />
                                            {userproduct.productStatus && (
                                                <div className={`status-banner ${userproduct.productStatus.toLowerCase()}-banner`}>
                                                    {userproduct.productStatus.toUpperCase()}
                                                </div>
                                            )}
                                            <figcaption>
                                                <p>{userproduct.productName}</p>
                                                <p>{userproduct.productPrice}</p>
                                                <p>{userproduct.productCondition}</p>
                                                <p>{userproduct.sellerUserName}</p>
                                            </figcaption>
                                        </Link>
                                    </figure>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
