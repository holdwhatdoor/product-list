import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import productsSlice from './reducers/productsSlice';

// default middleware with serializableCheck set to false
const nonSerializedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

// configured Store variable to handle state of store for App
export const store = configureStore({
  reducer: { products: productsSlice },
  initialState: [
    
  ],
  middleware: nonSerializedMiddleware,
});