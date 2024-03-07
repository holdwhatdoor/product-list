import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCategory } from '../reducers/productsSlice';
import { sortPrice } from '../reducers/productsSlice';

const searchBar = () => {
  // store variable declaration and variable to track state of store
  const store = useStore();
  const products = useSelector((state) => state);

  const categories = [];

  const [ searchInput, setSearch ] = useState('')
  const [ categorySelected, setCategory ] = useState()
  const [ priceSorted, setPriceSort ] = useState();

  const populateCategoryPicker = (categoriesArray) => {
    const [ selectedCategory, setCategory] = useState()
  }

  return (
    <div>
      <div className="container">
        <header className="search-bar">
          <form className="search-form">
            <div className="form-group form-group col-md-4">
              <h1>Search: </h1>
              <input 
                type="text" 
                id="search-query"
                className="form-control col-md-4"
                placeholder="enter search input"
                onChange={(event) => setSearch(event.target.value)}
              />
              <select
                name="selectedCategory"
                id="selectCategory"
                className='form-control col-md-1'
                onSelect={(event) => setCategory(event.target.value)}
                // defaultValue={}  
                multiple={false}
              >
                <option value=""></option>
              </select>
              <select
                name="sortPrice"
                id="sortPrice"
                className='form-control col-md-1'
                onSelect={(event) => setPriceSort(event.target.value)}
                // defaultValue={}  
                multiple={false}
              >
                <option value="Low to High"></option>
                <option value="High to Low"></option>
              </select>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
};

export default searchBar;