import axios from "axios";
import { FETCH_PRODUCTS, FETCH_PRODUCT, FETCH_CATEGORIES, FETCH_REVIEWS, FETCH_REVIEW, CREATE_PRODUCT, DELETE_PRODUCT, CREATE_REVIEW, DELETE_REVIEW} from './types';

const ROOT_URL = "http://localhost:8000";

/**
 * 
 * @param {String} currentPage 
 * @param {String} priceSortFilter 
 * @param {String} selectedCategory 
 * @param {String} search 
 * @returns 
 */
export const buildQueryUrlFromValidParams = (user, currentPage, priceSortFilter, selectedCategory, search) => {
  let validQueryParamsURL = `${user}/products?page=${currentPage}`;
  if(checkOptionalParamValid(priceSortFilter)){
    validQueryParamsURL = validQueryParamsURL.concat(`&price=${priceSortFilter}`);
  }
  if(checkOptionalParamValid(selectedCategory) && selectedCategory === "Categories"){
    
  }
  if(checkOptionalParamValid(selectedCategory) && selectedCategory !== "Categories" ){
    validQueryParamsURL = validQueryParamsURL.concat(`&category=${selectedCategory}`);
  }
  if(checkOptionalParamValid(search)){
    validQueryParamsURL = validQueryParamsURL.concat(`&query=${search}`)
  }
  return validQueryParamsURL;
}

export const signup = (signupInput, callback) => {
  axios.post(
    'http://localhost:8000/signup', 
    signupInput
  ).then(function (response){
    //dispatch action and local storage token assignment
    localStorage.getItem('token', response.data.token)
    // callback for page loading response after successful signup
    callback()
  })

}

export const login = (loginInput, callback) => {
  try{
    axios.post(
    'http://localhost:8000/auth/login',
    loginInput
  ).then(function (response){
    localStorage.setItem('token', response.data.token)
    callback()
  })
  // needs error catch response 
 } catch(err){
 }
}

  /**
   * 
   * @param {String} param 
   * @returns {Boolean} - param is valid if it is not undefined or and empty string
   */
function checkOptionalParamValid(param){
  let isValid = false;
  if(param !== undefined && param !== ""){
    isValid = true;
  }
  return isValid;
}

//
// action functions for string reference action types - for future use - not currently utilized
export function fetchProducts(){
  const request = axios.get(`${ROOT_URL}/products?`);

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