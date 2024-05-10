import axios from "axios";

// action type strings -- for future functionality - not currently used
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

const ROOT_URL = "http://localhost:8000";

/**
 * 
 * @param {String} currentPage 
 * @param {String} priceSortFilter 
 * @param {String} selectedCategory 
 * @param {String} search 
 * @returns 
 */
export const buildQueryUrlFromValidParams = (currentPage, priceSortFilter, selectedCategory, search) => {
  let validQueryParamsURL = `?page=${currentPage}`;
  if(checkOptionalParamValid(priceSortFilter)){
    validQueryParamsURL = validQueryParamsURL.concat(`&price=${priceSortFilter}`);
  }
  if(checkOptionalParamValid(selectedCategory) && selectedCategory === "Categories"){
    // validQueryParamsURL = validQueryParamsURL.concat(`&category=${selectedCategory}`);
    
  }
  if(checkOptionalParamValid(selectedCategory) && selectedCategory !== "Categories" ){
    validQueryParamsURL = validQueryParamsURL.concat(`&category=${selectedCategory}`);
  }
  if(checkOptionalParamValid(search)){
    validQueryParamsURL = validQueryParamsURL.concat(`&query=${search}`)
  }
  return validQueryParamsURL;
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