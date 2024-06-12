import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  isError: false,
  errorMsg : 1,
};

export const isErrorSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
   setIsError : (state, action)=>{
    state.isError = action.payload
   },
    setErrorMsg: (state, action) =>{
      state.errorMsg = action.payload;
    }
  },
});

export default isErrorSlice.reducer;
export const { setIsError,setErrorMsg } = isErrorSlice.actions;
