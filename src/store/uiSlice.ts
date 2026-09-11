import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  selectedCategory: string;
  searchQuery: string;
  cartDrawerOpen: boolean;
}

const initialState: UiState = {
  selectedCategory: "All",
  searchQuery: "",
  cartDrawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    openCartDrawer: (state) => {
      state.cartDrawerOpen = true;
    },

    closeCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },

    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
} = uiSlice.actions;

export default uiSlice.reducer;