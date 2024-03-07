// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState variable
const initialState = {
  products: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCategory = createAsyncThunk('reducers/fetchCategories', 
  async (categories, thunkApi) => {
    try{
      const response = await axios.get("localhost:8001/products")
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
  async (products, thunkApi) => {
    try{

      const response = await axios.get(
        "localhost:8001/products"
        // "localhost:8001/products?page=1&category=tools&price=lowest&query=sleek frozen shoes"
      )
      return response;
    } catch (err) {
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