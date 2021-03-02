import React from "react";
import { allProductsList } from "../Assets/data/allProductsList";
export const initialState = {
  basket: [],
  user: null,
  products: allProductsList,
  filtered: allProductsList,
  sort: "Latest Products",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SHOW_OLD_BASKET": {
      return {
        ...state,
        basket: action.payload,
      };
    }
    case "FILTER": {
      const { payload } = action;

      let filteredProducts = [...state.products];
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].name === "Color") {
          if (payload[i].value !== "All") {
            filteredProducts = filteredProducts.filter(
              (product) => product.color === payload[i].value
            );
          }
        }
        if (payload[i].name === "Category") {
          if (payload[i].value !== "All") {
            filteredProducts = filteredProducts.filter(
              (product) => product.category === payload[i].value
            );
          }
        }
        if (payload[i].name === "Style") {
          if (payload[i].value !== "All") {
            filteredProducts = filteredProducts.filter(
              (product) => product.style === payload[i].value
            );
          }
        }
      }

      if (state.sort === "Price Low to High") {
        filteredProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      if (state.sort === "Price High to Low") {
        filteredProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }

      return {
        ...state,
        filtered: filteredProducts,
      };
    }

    case "SORT": {
      const { payload } = action;
      let sortedProducts = [...state.filtered];

      if (payload == "Latest Products") {
        sortedProducts.sort(
          (a, b) => parseFloat(a.order) - parseFloat(b.order)
        );
      }
      if (payload == "Price Low to High") {
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      }
      if (payload == "Price High to Low") {
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
      return {
        ...state,
        filtered: sortedProducts,
        sort: payload,
      };
    }

    case "CLEAR_FILTER": {
      return {
        ...state,
        filtered: allProductsList,
        sort: "Latest Products",
      };
    }
    case "REMOVE_FROM_BASKET": {
      const newBasket = state.basket.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        basket: newBasket,
      };
    }
    case "ADD_TO_BASKET": {
      let newBasket = [...state.basket];
      const itemAlreadyExist = state.basket.find(
        (item) => item.id === action.payload.id
      );
      if (itemAlreadyExist) {
        const index = state.basket.indexOf(itemAlreadyExist);
        itemAlreadyExist.quantity += action.payload.quantity;
        itemAlreadyExist.subtotal =
          itemAlreadyExist.quantity * itemAlreadyExist.price;
        newBasket[index] = itemAlreadyExist;
      } else {
        newBasket = [...state.basket, action.payload];
      }

      return {
        ...state,
        basket: newBasket,
      };
    }
    case "INCREASE_QUANTITY": {
      const currentItem = state.basket.find(
        (item) => item.id === action.payload
      );
      const index = state.basket.indexOf(currentItem);
      let newBasket = [...state.basket];
      newBasket[index].quantity += 1;
      newBasket[index].subtotal =
        newBasket[index].quantity * newBasket[index].price;

      return {
        ...state,
        basket: newBasket,
      };
    }
    case "DECREASE_QUANTITY": {
      const currentItem = state.basket.find(
        (item) => item.id === action.payload
      );
      const index = state.basket.indexOf(currentItem);
      let newBasket = [...state.basket];
      if (newBasket[index].quantity > 1) {
        newBasket[index].quantity -= 1;
        newBasket[index].subtotal =
          newBasket[index].quantity * newBasket[index].price;
      } else {
        newBasket = state.basket.filter((item) => item.id !== action.payload);
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    default:
      return state;
  }
};
