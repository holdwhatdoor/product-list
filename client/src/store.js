import { combineReducers, configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import authSlice from './reducers/authSlice'
import productsSlice from './reducers/productsSlice';
import categorySlice from './reducers/categorySlice';
import paginationSlice from './reducers/paginationSlice';
import priceSortSlice from './reducers/priceSortSlice';
import searchSlice from './reducers/searchSlice';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  auth: authSlice,
  products: productsSlice,
  categories: categorySlice, 
  pagination: paginationSlice,
  priceSort: priceSortSlice,
  search: searchSlice,
})

// configured Store variable to handle state of store for App
export const store = configureStore({
  reducer: reducers,
  initialState: [
    { categories: { categories: [], selectedCategory: ""}, pagination: { totalPages: 0, currentPage: 0 }, priceSort: { priceSort: "desc" }, products: { products: [], selectedProduct: {}, productData: { _id: "", reviews: [], 
    name: "", price: 0, image: "" }  }, search: { search: "" } 
    }
  ],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});