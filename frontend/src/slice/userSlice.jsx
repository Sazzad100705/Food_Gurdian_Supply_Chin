import { createSlice } from "@reduxjs/toolkit";

export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export default userDetails.reducer;
export const { searchUser } = userDetails.actions;
