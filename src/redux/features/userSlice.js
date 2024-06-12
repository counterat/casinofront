import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDepositBalance:(state,action)=>{
      state.user.deposit_balance = action.payload
    },
    setBonusBalance:(state,action)=>{
      state.user.bonus_balance = action.payload
    }
  },
});

export default userSlice.reducer;
export const {setBonusBalance,setDepositBalance, setUser, setError, setLoading } = userSlice.actions;
