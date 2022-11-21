import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: null,
  lightbox: null,
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    saveQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    saveLightbox: (state, action) => {
      state.lightbox = action.payload;
    }
  },
});

export const { saveQuery, saveLightbox } = querySlice.actions;

export const selectSearchQuery = (state) => state.query.searchQuery;
export const selectLightbox = (state) => state.query.lightbox;

export default querySlice.reducer;
