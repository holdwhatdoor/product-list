// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for search slice
const initialState = {
  search: undefined
}
const baseUrl = 'http://localhost:8000/products';

export const fetchSearch = createAsyncThunk('reducers/fetchSearch', async(url, thunkApi) => {
  try{
    let response = undefined;
    response = await axios.get(`${baseUrl}${url}`);
    return response;
  } catch(err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting search slice' });
  }
})

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.search = action.payload.data.query;
        state.loading = false;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.search = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default searchSlice.reducer;
