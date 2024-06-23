import React, { useState, useContext, useEffect } from 'react';
import '../styles/Profile.css';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaStar, FaSchool } from 'react-icons/fa';
import { ProductsContext } from '../GLOBAL/contexts/ProductsContext';
import { Link } from 'react-router-dom';
import { useUser, useSetUser } from '../GLOBAL/contexts/UserContext';
import { useProducts } from '../GLOBAL/contexts/ProductsContext';

export default function Profile() {
  const user = useUser();
  const setUser = useSetUser();
  const { products, fetchProducts } = useProducts();

	const [userProducts, setUserProducts] = useState([]);

  console.log('Current user: ', user);
	console.log('Current user details: ', user);
  
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	useEffect(() => {
		if (user && products) {
			const filteredProducts = products.filter((product) => product.sellerId === user.uid);
			setUserProducts(filteredProducts);
		}
	});

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
