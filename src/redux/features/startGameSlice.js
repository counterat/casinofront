import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startGame: false
};

export const startGameSlice = createSlice({
  name: 'start',
  initialState,
  reducers: {
    setStart: (state, action) => {
      state.startGame = action.payload;
    },
  },
});

export default startGameSlice.reducer;
export const { setStart } = startGameSlice.actions;
