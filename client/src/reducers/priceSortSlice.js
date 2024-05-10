// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for priceSort slice
const initialState = {
  priceSort: "desc"
};

const baseUrl = 'http://localhost:8000/products';

export const fetchPriceSort = createAsyncThunk('reducers/fetchPriceSort', async (url, thunkApi) => {
  try{
    let response = undefined;
    response = await axios.get(`${baseUrl}${url}`);
    return response;
  } catch(err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting price sort' });
  }
})

const priceSortSlice = createSlice({
  name: "priceSort",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceSort.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPriceSort.fulfilled, (state, action) => {
        state.priceSort = action.payload.data.priceSort;
        state.loading = false;
      })
      .addCase(fetchPriceSort.rejected, (state, action) => {
        state.priceSort = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default priceSortSlice.reducer;