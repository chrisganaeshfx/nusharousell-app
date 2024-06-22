import React, {useContext, useEffect} from "react";
import {ProductsContext} from '../../GLOBAL/components/ProductsContext';
import { Link } from 'react-router-dom';

export const NewlyAdded = () => {
  const {products, fetchProducts} = useContext(ProductsContext);

  useEffect(() => {
    fetchProducts('createdAt', 'desc');
  }, [fetchProducts]);


  return (
    <div>
      <h3> Newly Added </h3>
      <br />
      <div className="new-products">
        {products.map(product => (
          <div key={product.ProductID}>
            <figure>
              <Link to={`/productdetail/${product.productID}`}>
                <img src={product.productImage} alt="Image Not Found" />
                <figcaption>
                  {product.productName} <br /> {product.productPrice} <br /> {product.productCondition} <br /> {product.sellerUserName}
                </figcaption>
              </Link>
            </figure>
          </div>
        ))}
      </div>
    </div>
  )
}
  
export default NewlyAdded;

