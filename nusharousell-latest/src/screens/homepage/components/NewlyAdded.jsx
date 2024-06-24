import React, { useState, useEffect } from 'react';
import { useProducts } from '../../GLOBAL/contexts/ProductsContext';
import { useUser } from '../../GLOBAL/contexts/UserContext';
import { Link } from 'react-router-dom';
import '../../styles/ProductList.css';

export default function NewlyAdded() {
    const { products, fetchProducts, loading } = useProducts();
    const { user } = useUser();
    const [nonUserAvailableProducts, setNonUserAvailableProducts] = useState([]);

    useEffect(() => {
        fetchProducts('createdAt', 'desc');
    }, [fetchProducts]);

    useEffect(() => {
        if (products) {
            // Filter products where sellerID !== user.userID and productStatus === 'Available'
            const filteredProducts = products.filter((product) => {
                return product.sellerID !== user.userID && product.productStatus === 'Available';
            });
            setNonUserAvailableProducts(filteredProducts);
        }
    }, [products, user]);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div className='product-list-container'>
            <br />
            <div className='product-list'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    nonUserAvailableProducts.map((product) => (
                        <div key={product.productID} className='product-card'>
                            <figure>
                                <Link to={`/productdetail/${product.productID}`}>
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
                    ))
                )}
            </div>
        </div>
    );
}
