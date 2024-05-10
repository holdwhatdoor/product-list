import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from '../reducers/productsSlice';
import { fetchCategories, filterCategory } from '../reducers/categorySlice';
import { fetchPagination } from '../reducers/paginationSlice';
import { fetchPriceSort } from '../reducers/priceSortSlice';
import { fetchSearch } from '../reducers/searchSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { buildQueryUrlFromValidParams } from '../actions';

const SearchBar = () => {
  // store variable declaration and variable to track state of store
  const store = useStore();
  const navigate = useNavigate();

  // selector state variables for react component
  let currentPage = useSelector((state) => state.pagination.currentPage);
  const categories = useSelector((state) => state.categories.categories);
  const priceSortFilter = useSelector((state) => state.priceSort.priceSort);
  const currentCategory = useSelector((state) => state.categories.selectedCategory);
  const searchQuery = useSelector((state) => state.search.search);

  // user input component variables
  const [ searchInput, setSearch ] = useState()
  const [ inputCategorySelected, setCategory ] = useState()
  const [ priceSorted, setPriceSort ] = useState();

  useEffect(() => {
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchInput)))
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchInput)))
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchInput)))
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchInput)))
    store.dispatch(fetchSearch(buildQueryUrlFromValidParams(currentPage, priceSortFilter, currentCategory, searchInput)))
  }, [ store, currentCategory ])

  /**
   * handles change to textfield for search input 
   * 
   * @param {*} searchInput 
   */
  const handleOnSearchInputChange = (searchText) => {
    currentPage = 1;
    setSearch(searchText)

    let storeStateCurrentPriceSort = store.getState().priceSort.priceSort;
    let storeStateCurrentSelectedCategory = store.getState().categories.selectedCategory;
    
    let pageToNavTo = buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, storeStateCurrentSelectedCategory, searchText)
    
    store.dispatch(fetchSearch(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, storeStateCurrentSelectedCategory, searchText)))
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, storeStateCurrentSelectedCategory, searchText)))
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, storeStateCurrentSelectedCategory, searchText)))
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, storeStateCurrentSelectedCategory, searchText)))
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, storeStateCurrentSelectedCategory, searchText)))
    navigate(pageToNavTo)
  }

  /**
   * 
   * handles change to category value selected from dropdown - defaults to page 1 of products
   * 
   * @param {String} chosenCategory 
   */
  const handleOnCategorySelect = (chosenCategory) => {
    currentPage = 1;
    setCategory(chosenCategory);

    let storeStateCurrentPriceSort = store.getState().priceSort.priceSort;
    let storeStateCurrentSearchInput = store.getState().search.search;
    
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, chosenCategory, storeStateCurrentSearchInput)))
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, chosenCategory, storeStateCurrentSearchInput)))
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, chosenCategory, storeStateCurrentSearchInput)))
    store.dispatch(fetchSearch(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, chosenCategory, storeStateCurrentSearchInput)))
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, chosenCategory, storeStateCurrentSearchInput)))

    let pageToNavTo = buildQueryUrlFromValidParams(currentPage, storeStateCurrentPriceSort, chosenCategory, storeStateCurrentSearchInput)
    navigate(pageToNavTo);
  }

  /**
   * 
   * handles change to sorting price by value from drop-down menu
   * 
   * @param {String} priceSortSelected 
   */
  const handleOnPriceSortSelect = (priceSortSelected) => {
    setPriceSort(priceSortSelected)
    let newSearch = store.getState().search.search;
    let newSelectedCategory = store.getState().categories.selectedCategory;
    store.dispatch(fetchPriceSort(buildQueryUrlFromValidParams(currentPage, priceSortSelected, newSelectedCategory, newSearch)))
    store.dispatch(filterCategory(buildQueryUrlFromValidParams(currentPage, priceSortSelected, newSelectedCategory, newSearch)))
    store.dispatch(fetchSearch(buildQueryUrlFromValidParams(currentPage, priceSortSelected, newSelectedCategory, newSearch)))
    store.dispatch(fetchProducts(buildQueryUrlFromValidParams(currentPage, priceSortSelected, newSelectedCategory, newSearch)))
    store.dispatch(fetchPagination(buildQueryUrlFromValidParams(currentPage, priceSortSelected, newSelectedCategory, newSearch)))

    let pageToNavTo = buildQueryUrlFromValidParams(currentPage, priceSortSelected, inputCategorySelected, searchInput);

    navigate(pageToNavTo)
  }

  // returned JSX component Search bar
  return (
    <div style={{backgroundColor: 'lightgrey'}}>
      <div className="container" style={{}}>
        <header className="search-bar">
          <form className="search-form form-group row">
            <div className='col-md-8'>
              <input 
                type="text" 
                id="search-query"
                className="form-control "
                placeholder="Search"
                onChange={(event) => handleOnSearchInputChange(event.target.value)}
              />
            </div>
            <div className='col-md-2'>
              <select
                name="selectedCategory"
                id="selectCategory"
                className='form-control minimal'
                style={{ fontWeight: 'bold' }}
                value={inputCategorySelected}
                onChange={(event) => handleOnCategorySelect(event.target.value)}
                multiple={false}>
                  <option 
                  value={ undefined }
                    style={{ fontWeight: 'bold', backgroundColor: "lightgray" }}>
                      Categories
                  </option>
                  {categories.map((category) => (
                  <option 
                    style={{ backgroundColor: "white" }} 
                    value={category} key={category}>
                      {category}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-2'>
              <select
                name="sortPrice"
                id="sortPrice"
                className='form-control'
                style={{ fontWeight: 'bold' }}
                onChange={(event) => handleOnPriceSortSelect(event.target.value)}
                defaultValue="desc"   
                multiple={false}>
                <option 
                  style={{ fontWeight: 'bold', backgroundColor: "lightgray"  }} 
                  value="desc">
                    Sort price
                </option>
                <option 
                  style={{ backgroundColor: "white" }} 
                  value="asc">
                    Ascending
                </option>
                <option 
                  style={{ backgroundColor: "white" }} 
                  value="desc">
                    Descending
                </option>
              </select>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
};

export default SearchBar;