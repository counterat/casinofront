import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  currentPayment: null
};

export const currentBetSlice = createSlice({
  name: 'currentBet',
  initialState,
  reducers: {
    
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
    deleteCurrentPayment:(state)=>{
        state.currentPayment = null
    },
 
  },
});

export default currentBetSlice.reducer;
export const { setCurrentPayment,deleteCurrentPayment, setError, setLoading } = currentBetSlice.actions;
