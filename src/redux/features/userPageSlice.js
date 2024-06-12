import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasUserPage: false
};

export const hasUserPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {
    setHasUserPage: (state, action) => {
      state.hasUserPage = action.payload;
    },
  },
});

export default hasUserPageSlice.reducer;
export const { setHasUserPage } = hasUserPageSlice.actions;
