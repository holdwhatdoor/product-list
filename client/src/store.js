import { combineReducers, configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import productsSlice from './reducers/productsSlice';
import categorySlice from './reducers/categorySlice';
import paginationSlice from './reducers/paginationSlice';

const reducers = combineReducers({
  products: productsSlice,
  categories: categorySlice, 
  pagination: paginationSlice 
})

// configured Store variable to handle state of store for App
export const store = configureStore({
  reducer: reducers,
  initialState: [
    { searchInput: "", categories: [], pages: [], selectedCategory: "", currentPage: 1, products: [], selectedProduct: "", productData: { _id: "", reviews: [], 
    name: "", price: 0, image: "" } }
  ],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});