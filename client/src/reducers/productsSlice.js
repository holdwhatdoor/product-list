// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for products slice
const initialState = {
  products: [], 
  selectedProduct: {}
  
};

const baseUrl = 'http://localhost:8000/auth/';

export const fetchProducts = createAsyncThunk('reducers/fetchProducts', 
  async (url, thunkApi) => {
    try{
      let response = await axios.get(`${baseUrl}${url}`);
      return response
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return thunkApi.rejectWithValue({ err: 'Error with getting products' });
    }
}) 

export const fetchProduct = createAsyncThunk('reducers/fetchProduct',
  async (url, thunkApi) => {
  try {
    let response = await axios.get(`${baseUrl}/${url}`)
    return response
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting product' });
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => { state.selectedProduct = initialState.selectedProduct },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.products;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.data[0];
        state.succeeded = true;
        state.error = undefined;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.data = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload.message;
      })
  }
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;