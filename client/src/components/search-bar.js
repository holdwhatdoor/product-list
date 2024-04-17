import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts, fetchProduct } from '../reducers/productsSlice';
import { fetchCategories, filterCategory } from '../reducers/categorySlice';
import { fetchPagination } from '../reducers/paginationSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';

const SearchBar = () => {
  // store variable declaration and variable to track state of store
  const store = useStore();
  const categoryData = useSelector((state) => state.categories);
  const productData = useSelector((state) => state.products);
  const paginationData = useSelector((state) => state.pagination);

  // const [categories, getCategories] = useState();

  useEffect(() => {
    store.dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    store.dispatch(fetchPagination());
  }, [])
  useEffect(() => { 
    store.dispatch(fetchProducts());
  }, [])


  // component category empty array to be populated with fetched data assigned to store state from db 
  // const categories = data;

  // user input component variables
  const [ searchInput, setSearch ] = useState('')
  const [ categorySelected, setCategory ] = useState('')
  const [ priceSorted, setPriceSort ] = useState('');

  const onSearchInputChange = () => {
    store.dispatch()
  }

  const onCategorySelect = () => {
    store.dispatch()
  }

  const PopulateCategoryPicker = (categoriesArray) => {
    const [ selectedCategory, setCategory] = useState('')
    store.dispatch(fetchCategories());
  }

  const onPriceSortSelect = () => {
    store.dispatch()
  }
  
  // test returned data -- to be removed --
  console.log("search-bar component store data *^*^*^*^*^*^*")
  console.log(categoryData)
  console.log(productData)
  console.log(paginationData)

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
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className='col-md-2'>
              <select
                name="selectedCategory"
                id="selectCategory"
                className='form-control minimal'
                onSelect={(event) => setCategory(event.target.value)}
                placeholder={"Sort By Category"}
                defaultValue= {"Sort By Category"}   
                multiple={false}
              >
                <option style={{ fontWeight: 'bold' }}>Category:</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div className='col-md-2'>
              <select
                name="sortPrice"
                id="sortPrice"
                className='form-control'
                onSelect={(event) => setPriceSort(event.target.value)}
                defaultValue={ "Sort By Price" }  
                multiple={false}
              >
                <option >Sort Price</option>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
              </select>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
};

export default SearchBar;