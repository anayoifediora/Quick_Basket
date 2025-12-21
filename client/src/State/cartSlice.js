import { createSlice } from "@reduxjs/toolkit";
import Auth from "../utils/auth";

//Get the current username (or use "guest" if not logged in);
const username = Auth.loggedIn() ? Auth.getProfile().data.username : "guest";

//Use the username to create a unique key
const cartKey = `cart${username}`;

export const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem(cartKey)) || [],
  reducers: {
    //Add a product to the cart
    addToCart: (state, action) => {
      //Push the new product to the state array
      state.push(action.payload);
      //Save updated cart in local storage to persist data across refreshes
      localStorage.setItem(cartKey, JSON.stringify(state));
    },
    //Remove a specific product from the cart by its ID
    removeFromCart: (state, action) => {
      //Filter out the product that matches the given ID
      let newState = state.filter(
        (product) => product._id !== action.payload._id
      );
      //Persist the updated cart in localStorage
      localStorage.setItem(cartKey, JSON.stringify(newState));
      //Return the new state
      return newState;
    },
    //Clear the entire cart
    clearCart: () => {
      localStorage.removeItem(cartKey);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
