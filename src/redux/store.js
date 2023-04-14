import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';

const store = configureStore({
  reducer: {
    mainState: mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
