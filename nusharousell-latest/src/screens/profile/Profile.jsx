import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaStar, FaSchool } from 'react-icons/fa';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { useProducts } from '../GLOBAL/contexts/ProductsContext';
import { useUsers } from '../GLOBAL/contexts/UsersContext';

import '../styles/Profile.css'; // Keep general profile styles
import '../styles/ProductList.css'; // Use product card styles from ProductList.css

export default function Profile() {
  // Get the current user from AuthUserContext
  const { user } = useAuthUser();
  const currUser = { user };

  // Get all users from UsersContext
	const { users } = useUsers();
  // Get the sellerID from the URL -> used to display the seller's profile
	const { userID: sellerID } = useParams();
  // Store the selected seller's information
	const [seller, setSeller] = useState(null);

  // Get all products from ProductsContext
  const { products, fetchProducts } = useProducts();
  // Store the products of the selected seller
  const [sellerProducts, setSellerProducts] = useState([]);

  // Find the seller from the users array, based on the extracted sellerID
	useEffect(() => {
    if (users.length > 0) {
        const foundSeller = users.find((u) => u.userID === sellerID);
        setSeller(foundSeller);
        console.log('sellerID:', sellerID);
        console.log('foundSeller:', foundSeller);
    }
}, [users, sellerID]);

	// Fetch products when component mounts
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);


  // Effect to filter products of the selected seller
  useEffect(() => {
    if (seller && products.length > 0) {
        const filteredProducts = products.filter((product) => product.sellerID === seller.userID);
        setSellerProducts(filteredProducts);
    }
}, [seller, products]);

	if (!seller || !products || !users) {
		return <div>Loading...</div>;
	}

	return (
		<div className='profile-page'>
			<div className='profile-column'>
				<div className='avatar'>
					{seller.imageUrl && (
						<img
							src={seller.imageUrl}
							alt={`${seller.userName}'s profile-pic`}
						/>
					)}
				</div>
				<h3>@{seller.userName}</h3>
				<p>
					<IoMdMail />: {seller.email}
				</p>
				<p>
					<FaPhoneAlt />: +65 {Number(seller.phoneNumber)}
				</p>
				<p>
					{seller.rating !== 0 ? (
						<>
							<FaStar />: {seller.rating}/5.0
						</>
					) : (
						'No ratings yet'
					)}
				</p>
				<p>
					<FaSchool />: {seller.meetupLocation}
				</p>
        {currUser.userID === seller.userID && (<button onClick={() => (window.location.href = `/userprofile/edit/${seller.userID}`)}>
					Edit Profile
				</button>)}
				
			</div>
			<div className='listing-column'>
				<h2>My Listings</h2>
				<div className='product-list-container'>
					<div className='product-list'>
						{sellerProducts.length > 0 ? (
							sellerProducts.map((product) => (
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
												S$ {product.productPrice}
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
