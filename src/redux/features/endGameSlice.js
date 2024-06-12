import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  endGame: false
};

export const endGameSlice = createSlice({
  name: 'end',
  initialState,
  reducers: {
    setEnd: (state, action) => {
      state.startGame = action.payload;
    },
  },
});

export default endGameSlice.reducer;
export const { setEnd } = endGameSlice.actions;
