import React, { useState, useEffect } from 'react';
import { useUser } from '../../GLOBAL/contexts/UserContext';
import { useProducts } from '../../GLOBAL/contexts/ProductsContext';
import { Link } from 'react-router-dom';
import '../../styles/ProductList.css';

export default function Catalogue() {
	const { products, fetchProducts, loading } = useProducts();
	const { user } = useUser();
	const [availableProducts, setAvailableProducts] = useState([]);

	useEffect(() => {
		fetchProducts('createdAt', 'desc');
	}, [fetchProducts]);

	useEffect(() => {
		if (products) {
			const filteredProducts = products.filter((product) => {
				if (user) {
					// Filter products where sellerID !== user.userID and productStatus === 'Available'
					return product.sellerID !== user.userID && product.productStatus === 'Available';
				} else {
					// Filter products where productStatus === 'Available'
					return product.productStatus === 'Available';
				}
			});
			setAvailableProducts(filteredProducts);
		}
	}, [products, user]);

	if (loading || !products) {
		return <div>Loading...</div>;
	}

	return (
		<div className='product-list-container'>
			<br />
			<div className='product-list'>
				{availableProducts.map((product) => (
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
										src={product.productImage}
										alt={product.productName}
										className='product-image'
									/>
								</div>
								<figcaption className='product-info'>
									{product.productName}<br/>
									{product.productPrice}<br/>
									{product.productCondition}<br/>
								</figcaption>
							</Link>
						</figure>
					</div>
				))}
			</div>
		</div>
	);
}
