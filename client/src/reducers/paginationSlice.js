// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for pagination slice
const initialState = {
  totalPages: 1,
  currentPage: 1,
};

const baseUrl = 'http://localhost:8000/products';

export const fetchPagination = createAsyncThunk('reducers/fetchPagination', async (url, thunkApi) => {
  try{
    let response = undefined;
    response = await axios.get(`${baseUrl}${url}`);
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting pagination' });
  }
})

const paginationSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPagination.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPagination.fulfilled, (state, action) => {
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
        state.loading = false;
      })
      .addCase(fetchPagination.rejected, (state, action) => {
        state.pagination = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default paginationSlice.reducer;
