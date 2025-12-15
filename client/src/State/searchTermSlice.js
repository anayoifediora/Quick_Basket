import { createSlice } from '@reduxjs/toolkit';

export const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: "",
    reducers: {
        //Add the search term
        addSearchTerm: (state, action) => action.payload,
        //clear the search term
        clearSearchTerm: () => "",
    },
});

export const { addSearchTerm, clearSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;