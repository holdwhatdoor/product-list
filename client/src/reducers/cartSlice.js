// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for user cart slice
const initialState = {
  username: "",
  cart: []
}
const baseUrl = 'http://localhost:8000/auth/';

export const fetchCart = createAsyncThunk('reducers/fetchCart', async(url, thunkApi) => {
  try{
    let response = undefined;
    response = await axios.get(`${baseUrl}${url}`);
    return response;
  } catch(err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with getting user cart' });
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.username = action.payload.data.username;
        state.cart = action.payload.data.cart;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.username = undefined;
        state.cart = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default cartSlice.reducer;
