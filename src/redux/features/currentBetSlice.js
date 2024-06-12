import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  currentBet: null
};

export const currentBetSlice = createSlice({
  name: 'currentBet',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setCurrentBet: (state, action) => {
      state.currentBet = action.payload;
    },
    deleteCurrentBet:(state)=>{
        state.currentBet = null
    },
 
  },
});

export default currentBetSlice.reducer;
export const { setCurrentBet,deleteCurrentBet, setError, setLoading } = currentBetSlice.actions;
