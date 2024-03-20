// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { filterCategory } from './productsSlice';


// initialState categories variable
const initialState = {
  categories: [],
  selectedCategory: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCategories = createAsyncThunk('reducers/fetchCategories', async (thunkApi) => {
  try{
    const response = await axios.get("localhost:8000/products")
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting categories' });
  }
})

export const filterCategory = createAsyncThunk('reducers/filterCategories', 
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