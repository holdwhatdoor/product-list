import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCardIndex = (props) => {

  return (
    <div className="card-container" 
        style={{ width: '95%', 
        height: '90%', 
        padding: '5%' }}>
      <div className='header' 
        style={{ 
        width: "100%", 
        backgroundColor: 'white', 
        borderColor: 'white', 
        display: 'inline-block'}}>
        <label className='card-header col-sm-3' 
          style={{
          fontSize: 15, 
          backgroundColor: 'white', 
          textAlign: "center", 
          verticalAlign: "text-bottom", 
          marginLeft: '3%' }}>
            Category: 
        </label>
        <label className='card-header col-sm-4' 
          style={{
          fontSize: 15, 
          backgroundColor: 'white', 
          fontWeight: 'bold' }} 
          id="category-name" >
            {props.data.category}
        </label>
        <label className='card-header col-sm-4' 
          style={{ 
          backgroundColor: 'white', 
          textAlign: "right" }} 
          id="price">
            <h3>{props.data.price}</h3>
        </label>        
      </div>
      <div className='card-body media' 
        style={{
        padding:'1% 5% 1% 5%', 
        backgroundColor: 'white', 
        display: 'block' }}>
        <div className="image-container" 
          style={{ 
          backgroundColor: "grey", 
          height: "100%", 
          width: "100%", 
          verticalAlign: 'middle', 
          textAlign: 'center', 
          blockSize: "140px" }}>
          <img className='card-body' 
            src='' 
            id="product" 
            alt={props.data.image} 
            style={{ height: "100%", width: "100%" }} />
        </div>
      </div>  
      <div className='card-footer' 
        id="product-name" 
        style={{ padding: '5%', backgroundColor: 'white' }}>
        <h3 
          id="product-name">
            {props.data.name}
        </h3>
      </div>
    </div>
  );
}

export default ProductCardIndex;
