import React, { useContext, useEffect } from "react";
import { ProductsContext } from '../../GLOBAL/components/ProductsContext';
import { Link } from 'react-router-dom';
import '../../styles/ProductList.css'; // Updated CSS file import

const ProductList = ({ title }) => {
  const { products, fetchProducts, loading } = useContext(ProductsContext);

  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts('createdAt', 'desc');
  }, [fetchProducts]);

  return (
    <div className="product-list-container">
      <h3>{title}</h3>
      <br />
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map(product => (
            <div key={product.ProductID} className="product-card">
              <figure>
                <Link to={`/productdetail/${product.productID}`}>
                  <img src={product.productImage} alt="Image Not Found" />
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
};

export default ProductList;
