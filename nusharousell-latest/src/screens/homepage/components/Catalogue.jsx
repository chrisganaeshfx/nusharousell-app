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
							<Link to={`/product/view/${product.productID}`}>
								<img
									src={product.productImage}
									alt={product.productName} // Use a descriptive alt text
								/>
								<figcaption>
									{product.productName} <br />
									{product.productPrice} <br />
									{product.productCondition} <br />
									{product.sellerUserName}
								</figcaption>
							</Link>
						</figure>
					</div>
				))}
			</div>
		</div>
	);
}
