import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { Link } from 'react-router-dom';
import { useProducts } from '../GLOBAL/contexts/ProductsContext';
import '../styles/Search.css';

const Search = () => {
  const { keyword } = useParams();
  const { user } = useAuthUser();
  const { products, fetchProducts } = useProducts();
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    fetchProducts('createdAt', 'desc');
}, [fetchProducts]);

  useEffect(() => {
    if (keyword && products) {
      const filteredProducts = products.filter((product) =>{
        if (user) {
            return product.sellerID !== user.userID && 
                product.productStatus === 'Available' && 
                product.productName.toLowerCase().includes(keyword.toLowerCase());
        } else {
            return product.productStatus === 'Available' && 
            product.productName.toLowerCase().includes(keyword.toLowerCase());
        }
    });
      setSearchProducts(filteredProducts);
    } else {
      setSearchProducts([]);
    }
  }, [keyword, products, user]);


  return (
    <div className="search-products-container">
        <h2>Searched Products</h2>
            {searchProducts.length === 0 ? (
                <p>No products found</p>
                ) : (
                <div className="search-products-list">
                    {searchProducts.map((product) => (
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
                )
            }
    </div>
  );
};

export default Search;
