import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaStar, FaSchool } from 'react-icons/fa';
import { useUser } from '../GLOBAL/contexts/UserContext';
import { useProducts } from '../GLOBAL/contexts/ProductsContext';

import '../styles/Profile.css';
import '../styles/ProductList.css';

export default function Profile() {
    const { user } = useUser();
    const { products, fetchProducts } = useProducts();
    const [userProducts, setUserProducts] = useState([]);
    
    console.log('Current user: ', user);
    console.log('Current user details: ', user);
    
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
                <button onClick={() => (window.location.href = '/profile/edit')}>
                    Edit Profile
                </button>
            </div>
            <div className='listing-column'>
                <h2>My Listings</h2>
                <div className='l-image'>
                    {userProducts.length > 0 ? (
                        userProducts.map((userproduct) => (
                            <div key={userproduct.productID} className="product-card">
                                <figure>
                                    {userproduct.productStatus === 'Sold' && (
                                        <div className="status-banner sold-banner">SOLD</div>
                                    )}
                                    {userproduct.productStatus === 'Reserved' && (
                                        <div className="status-banner reserved-banner">RESERVED</div>
                                    )}
                                    <Link to={`/productdetail/${userproduct.productID}`}>
                                        <img
                                            src={userproduct.productImage}
                                            alt={`${userproduct.productName}`}
                                        />
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
                <br />
            </div>
        </div>
    );
}
