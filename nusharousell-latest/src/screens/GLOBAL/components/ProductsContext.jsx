import React, { createContext, useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// create context
export const ProductsContext = createContext();

// context provider
export const ProductsContextProvider = ({ children }) => {
  // defining useState variables
  const [products, setProducts] = useState([]);
  const [cachedProducts, setCachedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for initial fetch

  const fetchProducts = async (orderByField = null, orderDirection = null) => {
    try {
      setLoading(true); // Set loading to true before fetching

      // Check if products are already cached
      if (cachedProducts.length > 0) {
        setProducts(cachedProducts);
        setLoading(false); // Set loading to false as data is already available
        return;
      }

      let q = collection(db, 'Products');

      if (orderByField && orderDirection) {
        q = query(q, orderBy(orderByField, orderDirection));
      }

      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        ProductID: doc.id,
        ...doc.data()
      }));

      setProducts(productsData);
      setCachedProducts(productsData); // Cache products for future use
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setLoading(false); // Ensure loading state is false in case of error
    }
  };

  useEffect(() => {
    fetchProducts(); // Default fetch on mount
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

/*
if (sellerID) {
  q = query(q, where("sellerId", "==", sellerID));
}
*/