import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  game: {currentMultiplier:1, id:1},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setGameMultiplier: (state, action) => {
      state.game.currentMultiplier = action.payload;
    },
    setGameId: (state, action) =>{
      state.game.id = action.payload;
    }
  },
});

export default gameSlice.reducer;
export const { setGameMultiplier,setGameId, setError, setLoading } = gameSlice.actions;
