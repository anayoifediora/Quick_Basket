import { createSlice } from '@reduxjs/toolkit';

export const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: "",
    reducers: {
        addSearchTerm: (state, action) => action.payload,
        clearSearchTerm: () => "",
    },
});

export const { addSearchTerm, clearSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;