// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { filterCategory } from './productsSlice';


// initialState categories variable
const initialState = {
  categories: [], 
  selectedCategory: '',
  // status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  // error: null,
};

export const fetchCategories = createAsyncThunk('reducers/fetchCategories', async (thunkApi) => {
  try{
    const response = await axios.get("http://localhost:8000/products")
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting categories' });
  }
})

export const filterCategory = createAsyncThunk('reducers/filterCategories', 
  async (selectedCategory, thunkApi) => {
  try{
    const response = await axios.get(`http://localhost:8000/products?category=${selectedCategory}`)
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with category filter' });
  }
})

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data.categories;
        state.selectedCategory = action.payload.data.category;
        state.datareturned = action.payload.data;

        state.succeeded = true;
        state.error = undefined;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories = undefined;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default categorySlice.reducer;