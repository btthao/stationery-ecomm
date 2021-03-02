import React, { createContext, useContext, useReducer, useEffect } from "react";

export const ProductsContext = createContext();

export const ContextProvider = ({ reducer, initialState, children }) => (
  <ProductsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProductsContext.Provider>
);

export const useProductsContext = () => useContext(ProductsContext);
