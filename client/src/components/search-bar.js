import 'bootstrap/dist/css/bootstrap.min.css';
import { filterCategory } from '../reducers/productsSlice';
import { sortPrice } from '../reducers/productsSlice';
import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';

const SearchBar = () => {
  // store variable declaration and variable to track state of store
  const store = useStore();
  const products = useSelector((state) => state);

  const categories = [];

  const [ searchInput, setSearch ] = useState('')
  const [ categorySelected, setCategory ] = useState()
  const [ priceSorted, setPriceSort ] = useState();

  const PopulateCategoryPicker = (categoriesArray) => {
    const [ selectedCategory, setCategory] = useState()
  }

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
                <option>Category</option>
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