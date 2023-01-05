import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

// Экспортируем генераторы экшенов и редюсер
export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
