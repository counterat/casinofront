import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setUsers: (state, action) => {
      state.bets = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers, setLoading, setError } = usersSlice.actions;
