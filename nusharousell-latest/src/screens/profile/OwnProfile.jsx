import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaStar, FaSchool } from 'react-icons/fa';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { useProducts } from '../GLOBAL/contexts/ProductsContext';

import '../styles/Profile.css'; // Keep general profile styles
import '../styles/ProductList.css'; // Use product card styles from ProductList.css

export default function OwnProfile() {
    const { user } = useAuthUser();
    const { products, fetchProducts } = useProducts();
    const [userProducts, setUserProducts] = useState([]);

    console.log ('user:', user);
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
                    {user.imageUrl && (
                        <img
                            src={user.imageUrl}
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
                    {user.rating !== 0 ? (
                        <>
                            <FaStar />: {user.rating}/5.0
                        </>
                    ) : (
                        'No ratings yet'
                    )}
                </p>
                <p>
                    <FaSchool />: {user.meetupLocation}
                </p>
                <button onClick={() => window.location.href = `/userprofile/edit/${user.userID}`}>
                    Edit Profile
                </button>
            </div>
            <div className='listing-column'>
                <h2>My Listings</h2>
                <div className='product-list-container'>
                    <div className='product-list'>
                        {userProducts.length > 0 ? (
                            userProducts.map((product) => (
                                <div
                                    key={product.productID}
                                    className='product-card'>
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
                                                <img
                                                    src={product.productImageUrl}
                                                    alt={product.productName}
                                                    className='product-image'
                                                />
                                            </div>
                                            {product.productStatus && (
                                                <div
                                                    className={`status-banner ${product.productStatus.toLowerCase()}-banner`}>
                                                    {product.productStatus.toUpperCase()}
                                                </div>
                                            )}
                                            <figcaption className='product-info'>
                                                {product.productName}
                                                <br />
                                                {product.productPrice}
                                                <br />
                                                {product.productCondition}
                                                <br />
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
