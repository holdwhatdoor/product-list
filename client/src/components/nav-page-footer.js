import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { fetchPagination } from '../reducers/paginationSlice';
import { fetchProducts } from '../reducers/productsSlice';
import { filterCategory } from '../reducers/categorySlice';
import { fetchSearch } from '../reducers/searchSlice';
import { useNavigate } from 'react-router-dom';
import { buildQueryUrlFromValidParams } from '../actions';
import { fetchPriceSort } from '../reducers/priceSortSlice';

const NavPageFooter = () => {
  const store = useStore();
  const navigate = useNavigate();

  let currentPage = store.getState().pagination.currentPage;
  const priceSortFilter = store.getState().priceSort.priceSort;
  const currentCategory = store.getState().categories.selectedCategory;
  const searchQuery = store.getState().search.search;
  let totalPages = store.getState().pagination.totalPages; 

  const [ pageBtnIsCurrentPage, setPageBtnIsCurrentPage ] = useState(false);

  useEffect(() => {
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchQuery)))
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchQuery)))
    store.dispatch(fetchSearch(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchQuery)))
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchQuery)))
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchQuery)))
  }, [ store, currentCategory ])

  /**
   * 
   * @returns {Array} integers from 1 up to total number of pages
   */
  const totalPagesArray = (totalPages) => {
    const totalPagesArray = [];
    for(var i = 1; i <= totalPages; i++){
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }

  /**
   * 
   * @param {*} event 
   * @param {number} page 
   */
  const handleOnPageNumberClick = (event, page) => {

    let priceSortFilter = store.getState().priceSort.priceSort;
    let selectedCategory = store.getState().categories.selectCategory;
    let searchInput = store.getState().search.search;
    
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(page, priceSortFilter, selectedCategory, searchInput)))
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(page, priceSortFilter, selectedCategory, searchInput)))
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(page, priceSortFilter, selectedCategory, searchInput)))
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(page, priceSortFilter, selectedCategory, searchInput)))

    let pageToNavTo = buildQueryUrlFromValidParams(page, priceSortFilter, selectedCategory, searchInput)
    totalPages = store.getState().pagination.totalPages;

    if(store.getState().pagination.currentPage === page){
      setPageBtnIsCurrentPage(true)
      document.getElementById(page).disabled = true;
    }

    totalPagesArray(store.getState().pagination.totalPages).forEach((page) => document.getElementById(page).disabled = false);
    navigate(pageToNavTo)
  } 

  return (
    <div >
      <ul style={{ listStyle: "none", width: "100%", display: "table", textAlign: "center" }}>  
        {totalPagesArray(totalPages).map((page) => (
          <button
            disabled={currentPage === page} 
            onClick={ event => handleOnPageNumberClick(event, page) } 
            key={page}
            id={page}>
              {page}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default NavPageFooter;
