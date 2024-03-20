import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import productsSlice from './reducers/productsSlice';

// default middleware with serializableCheck set to false
// const nonSerializedMiddleware = (getDefaultMiddleware) => getDefaultMiddleware({
//   serializableCheck: false,
// });

// configured Store variable to handle state of store for App
export const store = configureStore({
  reducer: { products: productsSlice },
  initialState: [
    { searchInput: "", categories: "", pages: [], currentPage: "", productsData: { _id: "", reviews: [], categories: [], selectedCategory: "", 
    name: "", price: 0, image: "" } }
  ],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});