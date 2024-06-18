import React, { useState } from "react";
import { NewProduct } from "./AddProduct";

function ProductList({ product, setProduct }) {
  return (
    <h1> Dummy </h1>
    /*<div className="product-list">
      {product.length > 0 ? (
        products.map((products, i) => (
          <NewProduct
            key={i}
            products={products}
            i={i}
            product={product}
            setProduct={setProduct}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
    */
  );
}

export default ProductList;
