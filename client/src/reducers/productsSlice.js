// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState products variable
const initialState = {
  products: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const filterCategory = createAsyncThunk('reducers/fetchCategories', 
  async (categories, thunkApi) => {
  try{
    const response = await axios.get("localhost:8000/products")
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with category filter' });
  }
})

export const sortPrice = createAsyncThunk('reducers/sortPrice', 
  async(sort, thunkApi) => {
  try{

  } catch (err) {
    if(!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with price sort'});
  }
})

export const fetchProducts = createAsyncThunk('reducers/fetchProducts', 
  async (category, productQuery, thunkApi) => {
    try{
      const response = await axios.get(
        "localhost:5000/products"
        // "localhost:8000/products?page=1&category=tools&price=lowest&query=sleek frozen shoes"
      )
      return response;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return thunkApi.rejectWithValue({ err: 'Error with query' });
    }
}) 

export const fetchProduct = createAsyncThunk('reducers/fetchProducts',
  async (product, thunkApi) => {
  try {

  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with query' });
  }
})

export const searchQuery = createAsyncThunk('reducers/fetchProducts', 
  async (thunkApi) => {
  try {

  } catch(err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with query' });
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder 
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  }
});

export default productsSlice.reducer;