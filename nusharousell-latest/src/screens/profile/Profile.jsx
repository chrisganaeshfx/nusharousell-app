import React, { useState, useContext, useEffect } from 'react';
import '../styles/Profile.css';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaStar, FaSchool } from 'react-icons/fa';
import { ProductsContext } from '../GLOBAL/components/ProductsContext';
import { Link } from 'react-router-dom';

export default function Profile({ user, userDetails }) {
	console.log('Current user: ', user);
	console.log('Current user details: ', userDetails);

	const { products, fetchProducts } = useContext(ProductsContext);
	const [userProducts, setUserProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	useEffect(() => {
		if (user && products) {
			const filteredProducts = products.filter((product) => product.sellerId === user.uid);
			setUserProducts(filteredProducts);
		}
	});

	if (!userDetails) {
		return <div>Loading...</div>;
	}

	return (
		<div className='profile-page'>
			<div className='profile-column'>
				<div className='avatar'>
					{userDetails.image && (
						<img
							src={userDetails.image}
							alt={`${userDetails.userName}'s profile-pic`}
						/>
					)}
				</div>
				<h3>@{userDetails.userName}</h3>
				<p>
					<IoMdMail />: {userDetails.email}
				</p>
				<p>
					<FaPhoneAlt />: +65 {Number(userDetails.phoneNumber)}
				</p>
				<p>
					<FaStar />: {userDetails.rating}/5.0
				</p>
				<p>
					<FaSchool />: {userDetails.meetupLocation}
				</p>
				<button>
					<a onClick={() => (window.location.href = '/profile/edit')}>Edit Profile</a>
				</button>
			</div>
			<div className='listing-column'>
				<h2>My Listings</h2>
				<div className='l-image'>
					{userProducts.length > 0 ? (
						userProducts.map((userproduct) => (
							<div key={userproduct.productID}>
								<figure>
									<Link to={`/productdetail/${userproduct.productID}`}>
										<img
											src={userproduct.productImage}
											alt='Image Not Found'
										/>
										<figcaption>
											{userproduct.productName} <br /> {userproduct.productPrice} <br />{' '}
											{userproduct.productCondition} <br /> {userproduct.sellerUserName}
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
