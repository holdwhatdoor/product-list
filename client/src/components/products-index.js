import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCardIndex  from './product-card-index';
import { fetchProducts } from '../reducers/productsSlice';
import { fetchCategories } from '../reducers/categorySlice';
import { filterCategory  } from '../reducers/categorySlice';
import { fetchPagination } from '../reducers/paginationSlice';
import { fetchPriceSort } from '../reducers/priceSortSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Header from './header';
import SearchBar from './search-bar';
import NavPageFooter from './nav-page-footer';
import { useNavigate, useParams } from 'react-router-dom';
import { buildQueryUrlFromValidParams } from '../actions';
import { fetchSearch } from '../reducers/searchSlice';
import { clearSelectedProduct } from '../reducers/productsSlice';

const ProductsIndex = () => {
  
  const store = useStore();
  const navigate = useNavigate();

  // selector state slice variables
  const user = useSelector((state) => state.user.user)
  const productsArray = useSelector((state) => state.products.products) 
  const selectedProduct = useSelector((state) => state.products.selectedProduct)

  const currentPage = store.getState().pagination.currentPage;
  const priceSortFilter = store.getState().priceSort.priceSort;
  const currentCategory = store.getState().categories.selectedCategory;
  const searchQuery = store.getState().search.search;

  // initial dispatch calls to load page-state data
  useEffect(() => {
    store.dispatch(clearSelectedProduct());
    store.dispatch(fetchCategories(buildQueryUrlFromValidParams(user, currentPage, priceSortFilter, currentCategory, searchQuery)));
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(user, currentPage, priceSortFilter, currentCategory, searchQuery)));
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(user, currentPage, priceSortFilter, currentCategory, searchQuery)));
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(user, currentPage, priceSortFilter, currentCategory, searchQuery)));
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(user, currentPage, priceSortFilter, currentCategory, searchQuery)));
    store.dispatch(fetchSearch(buildQueryUrlFromValidParams(user, currentPage, priceSortFilter, currentCategory, searchQuery)))
  }, [ store, currentPage, currentCategory ]);

  /**
   * 
   * @param {Object} products 
   * @returns {Array} - returns array of product arrays with no more than 3 items per row array
   */
  const gridRowsArray = (products) => {
    products = [...products]
    const rows = [];
    while(products.length){
      rows.push((products.splice(0,3)))

    }
    return rows;
  }

  /**
   * 
   * @param {Array} productRowsArray 
   * @returns {JSX Element} 
   */
  const productGrid = (productRowsArray) => {
    return (
      productRowsArray.map((row, index) => (
        <div key={index} className="row row-md-4">
          {row.map((cell, index) => (
            <div key={index} className='col col-md-4' >
              <ProductCardIndex data={cell} />
            </div>
          ))} 
          </div>
      ))
    )
  }


  return (
      <div className="product-page-container" style={{ backgroundColor: 'lightgrey', position: 'absolute', height: "100%", width: "100%"}}>
        <Header />
        <div id='user-product-page-username'></div>
        <SearchBar />
        <div/>
        <div className="product-page grid row" style={{ backgroundColor: "lightgray"}} >
          <div className='row-md-4'>
            { productGrid(gridRowsArray(productsArray)) }
          </div>
        </div>
        <NavPageFooter />
      </div>  
  );

}

export default ProductsIndex;