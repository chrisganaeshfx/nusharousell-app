import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../../../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (orderByField = null, orderDirection = null) => {
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
  };

  useEffect(() => {
    fetchProducts(); // Default fetch on mount
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};