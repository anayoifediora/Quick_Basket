import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./State/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});