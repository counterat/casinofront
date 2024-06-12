import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  lastGames: [],
};

export const lastGamesSlice = createSlice({
  name: 'lastGames',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setLastGames: (state, action) => {
      state.lastGames = action.payload;
    },
    deleteLastElement: (state)=>{
        state.lastGames = state.lastGames.slice(0,-1);
    },
    addNewElement: (state, action) => {
      state.lastGames = [action.payload, ...state.lastGames];
  }
  
  
  },
});

export default lastGamesSlice.reducer;
export const { setLastGames, setError, setLoading, addNewElement, deleteLastElement } = lastGamesSlice.actions;
