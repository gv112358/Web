import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const accessSlice = createSlice({
  name: "access",
  initialState: {
    hasAccessed: false,
    username: "",
    goToRegistration: true,
    goToLogin: false,
    selectedCategory: "",
  },
  reducers: {
    access(state: any, action: PayloadAction<{ username: string }>) {
      state.hasAccessed = true;
      state.username = action.payload.username;
    },
    getSelectedCategory(
      state: any,
      action: PayloadAction<{ category: string }>
    ) {
      state.selectedCategory = action.payload.category;
    },

    disconnect(state) {
      state.hasAccessed = false;
      state.username = "";
      state.goToLogin = false;
      state.goToRegistration = true;
      state.selectedCategory = "";
    },
    goToRegistration(state) {
      state.goToLogin = false;
      state.goToRegistration = true;
    },
    goToLogin(state) {
      state.goToLogin = true;
      state.goToRegistration = false;
    },
  },
});

export const accessActions = accessSlice.actions;

export default accessSlice;
