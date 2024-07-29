import React, { useState, useEffect } from 'react';
import { useProducts } from '../../GLOBAL/contexts/ProductsContext';
import { useAuthUser } from '../../GLOBAL/contexts/AuthUserContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/CategoryButtons.css';

export default function Categories() {
  const { products, loading } = useProducts();
  const { user } = useAuthUser();
  const [category, setCategorySearch] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter((product) => {
        if (user) {
          return product.sellerID !== user.userID && product.productStatus === 'Available' && product.productCategory === category;
        } else {
          return product.productStatus === 'Available' && product.productCategory === category;
        }
      });
      setAvailableProducts(filteredProducts);
    }
  }, [products, user]);

  const handleCategoryClick = (category) => {
    setCategorySearch(category);
    navigate(`/categories/${category}`);
  };

  if (loading || !products) {
		return <div>Loading...</div>;
	}

  return (
    <div className="category-buttons-container">
      <div className="welcome-back">
        <h2>Welcome Back user! What would you like to find?</h2>
      </div>
      <div className="category-buttons">
        <button onClick={() => handleCategoryClick('Technology')}>Technology</button>
        <button onClick={() => handleCategoryClick('Home Living & Appliances')}>Home Living & Appliances</button>
        <button onClick={() => handleCategoryClick('Fashion')}>Fashion</button>
        <button onClick={() => handleCategoryClick('Self-care')}>Self-care</button>
        <button onClick={() => handleCategoryClick('Sports & Activities')}>Sports & Activities</button>
        <button onClick={() => handleCategoryClick('Services')}>Services</button>
      </div>
      <div className='category-products-container'>
			<br />
			<div className='category-products-list'>
				{availableProducts.length > 0 ? (
					availableProducts.map((product) => (
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
								<figcaption className='product-info'>
									{product.productName}<br/>
									S$ {product.productPrice}<br/>
									{product.productCondition}<br/>
								</figcaption>
							</Link>
						</figure>
					</div>
				))
			) : (
			  <p>No products available</p>
			)}
			</div>
		</div>
    </div>
  );
}
