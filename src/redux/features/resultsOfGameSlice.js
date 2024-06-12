import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  resultsOfGame: {isSuccess:null}
};

export const resultsOfGameSlice = createSlice({
  name: 'resultsOfGame',
  initialState,
  reducers: {
    
    setResultsOfgame: (state, action) => {
      state.resultsOfGame = action.payload;
    },
 
  },
});

export default resultsOfGameSlice.reducer;
export const { setResultsOfgame } = resultsOfGameSlice.actions;
