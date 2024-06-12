import { createSlice } from '@reduxjs/toolkit';

import { HEADER_DROPDOWN_OPTIONS } from '../../utils/constants';

const initialState = {
  selectedBalance: HEADER_DROPDOWN_OPTIONS[0],
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    selectBalance: (state, action) => {
      state.selectedBalance = action.payload;
    },
  },
});

export default balanceSlice.reducer;
export const { selectBalance } = balanceSlice.actions;
