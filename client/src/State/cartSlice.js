import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name:"cart",
    initialState: JSON.parse(localStorage.getItem('cart')) || [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeFromCart: (state, action) => {
            let newState = state.filter((product) => product.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;