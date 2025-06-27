import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import axios from 'axios';
import { fetchProduct } from '../reducers/productsSlice';

const ProductDetail = () => {
  const productID = useParams().product;
  const store = useStore();
  const product = useSelector((state) => state.products.selectedProduct);
  const navigate = useNavigate();
  
  const [ reviewsVisible, setReviewsVisible ] = useState(false)
  const [ editingIndex, setEditingIndex ] = useState(null);
   

  useEffect(() => {
    store.dispatch(fetchProduct(productID))
  }, [ store, productID, product ])

  // variable for product reviews
   const listOfProductReviews = (productReviewsArray) => {
    return (
      productReviewsArray?.map((cell, index) => (
        <li key={index} class="product-review-list-item row" >
          <label class="product-review-id-label">
            Review ID: {cell._id}
          </label>
          <label class="product-review-user-label">
            User: {cell.userName}
          </label>
            <div 
              key={index}
              class="product-review-text-div">
              { editingIndex === index ? (
                <div class='editing-container row'>
                  <textarea
                    id='editing-review-textarea'
                    type='text'
                    defaultValue={cell.text}
                    autoFocus={true}
                    // onChange={}
                  />
                  <div class='editing-review-btns-container'>
                    <button 
                      class='editing-review-save-btn'
                      onClick={handleSaveReviewEditClick(index, cell)}>
                        Save
                      </button>
                    <button 
                      class='editing-review-cancel-btn'
                      onClick={handleCancelReviewEditClick}>
                        Cancel
                    </button>
                  </div>
                </div>) 
                : 
                 <div>
                  <label>{cell.text}</label> 
                  <div class="product-review-list-del-edit-btns-container col">
                    <button 
                      class="product-review-del-btn" 
                      onClick={() => handleReviewDeleteBtnClick(index, cell)}>
                        Delete
                    </button>
                    <button 
                      class="product-review-edit-btn" 
                      onClick={() => handleReviewEditBtnClick(index, cell)}>
                        Edit
                    </button>
                  </div>
                </div>
              }
            </div>
        </li>
      ))
    )
  }

  const handleOnCancelProductChangesButtonClick = () => {
    switch(true){
      case reviewsVisible && editingIndex === null:
        setReviewsVisible(false)
        navigate('/products')
        break;
      case !reviewsVisible:
        navigate('/products')
        break;
      case reviewsVisible && editingIndex != null:
        setEditingIndex(null)
        setReviewsVisible(false)
        navigate('/products')
        break;
      default: 
        navigate('/products')
        break;
    }
  }

  const handleOnSaveProductButtonClick = () => {

  }

  const handleAddReviewBtnClick = async () => {
    const newReview = { userName: "anon", text: document.getElementById("input-review-textarea").value, productId: productID }

    try{
      await axios.post(`http://localhost:8000/products/${productID}`, newReview )
    } catch(err) {
    }

    document.getElementById("input-review-textarea").value = "";
    setReviewsVisible(true)
    if(!reviewsVisible){
      navigate('reviews')
    }
  }

  const handleReviewEditBtnClick = async (index, review) => {
    switch(true){
      case editingIndex === null:     
        setEditingIndex(index)
        navigate(`/products/${productID}/reviews/${review._id}`)
        break;
      case editingIndex != null && editingIndex !== index:
        setEditingIndex(index)
        navigate(`/products/${productID}/reviews/${review._id}`)
        break;
      default:
    }

  }

  const handleReviewDeleteBtnClick = async (index, review) => {
    try {
      await axios.delete(`http://localhost:8000/products/${productID}/reviews/${review._id}`)
    } catch(err) {
    }

  }

  const handleSaveReviewEditClick = (index, review) => {

  }

  const handleCancelReviewEditClick = () => {
    setEditingIndex(null)
    navigate(`/products/${productID}/reviews`)
  } 

  const toggleShowHideReviews = () => {
    switch(true){
      case reviewsVisible && editingIndex === null:
        setReviewsVisible(false)
        setEditingIndex(null)
        navigate(`/products/${productID}`)
        break;
      case !reviewsVisible:
        setReviewsVisible(true)
        navigate(`reviews`)
        break;
      case reviewsVisible && editingIndex != null:
        setReviewsVisible(false)  
        setEditingIndex(null)
        navigate(`/products/${productID}`)
        break;
      default:
    }
  }

  return (
    <div className="product-detail-container" style={{justifyItems:"center"}}>
      <div className="product-detail-name-row row" >
        <label className="col" style={{width: "200px"}} >Product Name: </label>
        <input 
          className="product-detail-name-input col"
          defaultValue={product.name} 
          style={{width: "300px"}} />
      </div>
      <div className="product-detail-category-row row" >
        <label class="col" style={{width: "200px"}} >Product Category: </label>
        <input 
          className="product-detail-category-input row"
          defaultValue={product.category}
          style={{width: "150px"}} />
      </div>
      <div className="image-container" 
          style={{ 
          backgroundColor: "grey", 
          verticalAlign: 'middle', 
          textAlign: 'center', 
          blockSize: "140px" }}>
          <img 
            className="product-detail-image row"
            src='' 
            alt={product.image}/>
      </div>
      <div className="product-detail-price-row row" >
        <label className="col" style={{width: "200px"}} >Price: </label>
        <input 
          className="product-detail-price row"
          defaultValue={product.price}
          style={{justifyItems: "center", width: "200px"}} />
      </div>
      
      <div className="back-edit-btn-row">
        <button 
          className="product-detail-back-btn" 
          onClick={handleOnCancelProductChangesButtonClick} >
            Cancel Changes
        </button>
        <button 
          className="product-detail-edit-btn" 
          onClick={handleOnSaveProductButtonClick} >Save Changes
        </button>
      </div>
      <div className='review-input row'>
        <textarea id="input-review-textarea" />
        <button class="add-review-btn" onClick={handleAddReviewBtnClick} >Add Review</button>
      </div>
      <div class="reviews-nav-section row">
        <div className='spacer col'></div>
        <h5 className="review-label-heading col">REVIEWS</h5>
        <div 
          className='reviews-show-hide-toggle col' 
          onClick={toggleShowHideReviews}>
            { reviewsVisible && <label className='show-hide-reviews-label-toggle'>Hide</label> }
            { !reviewsVisible && <label className='show-hide-reviews-label-toggle'>Show</label> }
        </div>
      </div>
      { reviewsVisible &&
      <div>
        <ul class='product-reviews-list' >
          { listOfProductReviews(product.reviews) }
        </ul>
      </div> 
      }
    </div>
  )
}

export default ProductDetail;