import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './authOperations';

const handlePending = state => {
  state.authIsLoading = true;
};

const handleRejected = (state, action) => {
  state.authError = action.payload;
  state.authIsLoading = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    authIsLoading: false,
    authError: null,
  },
  extraReducers: {
    [register.pending]: handlePending,
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authIsLoading = false;
      state.authError = null;
    },
    [register.rejected](state, action) {
      state.authError = action.payload;
      state.authIsLoading = false;
    },
    [logIn.pending]: handlePending,
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authIsLoading = false;
      state.authError = null;
    },
    [logIn.rejected]: handleRejected,
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.authError = null;
      state.authIsLoading = false;
    },
    [refreshUser.pending]: handlePending,
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.authError = null;
      state.authIsLoading = false;
    },
    [refreshUser.rejected](state) {
      state.authIsLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
