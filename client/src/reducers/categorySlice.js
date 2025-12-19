// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for categories slice
const initialState = {
  categories: [], 
  selectedCategory: undefined,
};

// api base Products url 
const baseUrl = 'http://localhost:8000/auth/';

export const fetchCategories = createAsyncThunk('reducers/fetchCategories', async (url, thunkApi) => {
  try{
    let response = undefined;
    response = await axios.get(`${baseUrl}${url}`);
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting categories' });
  }
})

export const filterCategory = createAsyncThunk('reducers/filterCategory', 
  async (url, thunkApi) => {
  try{
    let response = undefined;
    response = await axios.get(`${baseUrl}${url}`);
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
        state.loading = false;
        state.succeeded = true;
        state.error = undefined;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
      .addCase(filterCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterCategory.fulfilled, (state, action) => {

          state.selectedCategory = action.payload.data.category;
          state.loading = false;
          state.succeeded = true;
          state.error = undefined;

      })
      .addCase(filterCategory.rejected, (state, action) => {
        state.selectedCategory = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default categorySlice.reducer;