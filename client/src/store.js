import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./State/cartSlice";
import searchTermReducer from "./State/searchTermSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        searchTerm: searchTermReducer,
    },
});