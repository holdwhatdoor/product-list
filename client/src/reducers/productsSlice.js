// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState products variable
const initialState = {
  products: [],
  // status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  // error: null,
};

// sort by price -- to be removed 
// export const sortPrice = createAsyncThunk('reducers/sortPrice', 
//   async(sort, thunkApi) => {
//   try{

//   } catch (err) {
//     if(!err?.response) {
//       throw err;
//     }
//     return thunkApi.rejectWithValue({ err: 'Error with price sort'});
//   }
// })

// export const searchQuery = createAsyncThunk('reducers/fetchProducts', 
//   async (thunkApi) => {
//   try {

//   } catch(err) {
//     if (!err?.response) {
//       throw err;
//     }
//     return thunkApi.rejectWithValue({ err: 'Error with query' });
//   }
// })

export const fetchProducts = createAsyncThunk('reducers/fetchProducts', 
  async (currentPage, priceFilter, selectedCategory, productQuery, thunkApi) => {
    try{
      const response = await axios.get(`http://localhost:8000/products`)
      return response;

      // switch case to test for each api req.query params
      // let response = undefined;
      // switch(true){

      
      //   case(selectedCategory !== undefined && productQuery !== undefined):
      //     response = await axios.get(
      //       `http://localhost:8000/products?page${currentPage}&category=${selectedCategory}&price=${priceFilter}&query=${productQuery}`
      //     )
      //     return response;
      //   case(selectedCategory !== undefined):
      //     response = await axios.get(
      //       `http://localhost:8000/products?page${currentPage}&category=${selectedCategory}&price=${priceFilter}`
      //     )
      //     return response;
      //   case(productQuery !== undefined):
      //     response = await axios.get(
      //       `http://localhost:8000/products?page${currentPage}&price=${priceFilter}&query=${productQuery}`
      //     )
      //     return response;
      //   default: 
      //     response = await axios.get(`http://localhost:8000/products?page${currentPage}&price=${priceFilter}`)
      //   return response;
      // }

      // const response = await axios.get(
      //   // "localhost:8000/products"
      //   `localhost:8000/products?page=${currentPage}&category=${selectedCategory}s&price=${priceFilter}&query=${productQuery}`
      // )
      // return response;

    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return thunkApi.rejectWithValue({ err: 'Error with query' });
    }
}) 

export const fetchProduct = createAsyncThunk('reducers/fetchProduct',
  async (productId, thunkApi) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/products/${productId}`
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
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = undefined;
        state.failed = true;
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload.data.products;
        state.succeeded = true;
        state.error = undefined;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.data = undefined;
        state.failed = true;
        state.error = action.payload.message;
      })
  }
});

export default productsSlice.reducer;