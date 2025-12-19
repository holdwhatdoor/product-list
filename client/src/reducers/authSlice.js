// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState for pagination slice
const initialState = {
  username: "",
  authenticated: localStorage.getItem('token') || '',
  errorMessage: '',
};

const baseUrl = 'http://localhost:8000/auth/';

export const fetchAuth = createAsyncThunk('reducers/fetchAuth', async (url, thunkApi) => {
  try{
    let response = undefined;
   // response = await axios.get(`${baseUrl}${url}`);
    return response;
  } catch (err) {
    if (!err?.response) {
      throw err;
    }
    return thunkApi.rejectWithValue({ err: 'Error with authorization' });
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.username = action.payload.username
        state.authenticated = action.payload.data.token;
        state.loading = false;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
})

export default authSlice.reducer;
