import { createSlice } from '@reduxjs/toolkit';
import { deleteLastElement } from './lastGamesSlice';

const initialState = {
  loaded: false,
  hasError: false,
  bets: [],
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setBets: (state, action) => {
      state.bets = action.payload;
    },
    addNewBet:(state,action)=>{
      state.bets = [action.payload, ...state.bets];
    },
    deleteLastBet:(state)=>{
      state.bets = state.bets.slice(0,-1);
    }
  },
});

export default betsSlice.reducer;
export const { setBets, setLoading, setError, addNewBet, deleteLastBet } = betsSlice.actions;
