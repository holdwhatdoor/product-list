// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState page variable
const initialState = {
  pagination: {
    totalPages: 1,
    currentPage: 1,
  },
  // status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  // error: null,
};

export const fetchPagination = createAsyncThunk('reducers/fetchPages', async (thunkApi) => {
  try{
    let response = await axios.get("http://localhost:8000/products"); 
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting categories' });
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
        state.pagination.totalPages = action.payload.data.totalPages;
        state.pagination.currentPage = action.payload.data.currentPage;
      })
      .addCase(fetchPagination.rejected, (state, action) => {
        state.pagination = undefined;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default paginationSlice.reducer;
