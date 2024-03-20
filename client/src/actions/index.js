import axios from "axios";
import { FetchProducts } from "../reducers/productsSlice";
import { FetchProdcut } from '../reducers/productsSlice';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const FETCH_REVIEWS = "FETCH_PRODUCTS";
export const FETCH_REVIEW = "FETCH_PRODUCT";
export const DELETE_REVIEW = "DELETE_PRODUCT";
export const CREATE_REVIEW = "CREATE_PRODUCT";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_SORT = "FETCH_SORT";

const ROOT_URL = "localhost:8000";

export function fetchProducts(){
  const request = axios.get(`${ROOT_URL}/products`);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchProduct(id){
  const request = axios.get(`${ROOT_URL}/products/${id}`);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function deleteProduct(id, callback){
  const request = axios.delete(`${ROOT_URL}/products/${id}`);

  request.then(() => callback());

  return {
    type: DELETE_PRODUCT,
    payload: request
  }
}

export function createProduct(values, callback) {
  const request = axios.post(`${ROOT_URL}/products`, values);

  request.then(() => callback());

  return {
    type: CREATE_PRODUCT,
    payload: request,
  };
}

export function fetchReviews(productId){
  const request = axios.get(`${ROOT_URL}/products/${productId}/reviews`);

  return {
    type: FETCH_REVIEWS,
    payload: request
  };
}

export function fetchReview(id){
  const request = axios.get(`${ROOT_URL}/reviews/${id}`);

  return {
    type: FETCH_REVIEW,
    payload: request
  };
}

export function createReview(id, values, callback) {
  const request = axios.post(`${ROOT_URL}/products/${id}/reviews`, values);

  request.then(() => callback());

  return {
    type: CREATE_REVIEW,
    payload: request,
  };
}

export function deleteReview(id, callback){
  const request = axios.delete(`${ROOT_URL}/reviews/${id}`);

  request.then(() => callback());

  return {
    type: DELETE_REVIEW,
    payload: request
  }
}