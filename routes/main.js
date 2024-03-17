const router = require("express").Router();
// const { faker } = require("@faker-js/faker")
const Product = require("../models/product");
const Review = require("../models/review");

// code to generate random fake data
// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";
//     product.reviews = [];

//     product.save();
//   }
//   res.end();
// });

const products = [];
const productCategories = [];

// capitalizes first letter of string
const upperCaseFirstLetter = (string) => {
  if(string !== undefined || string !== ""){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function populateProductCategories(){
  // let productsArray;
  let categoryArray = Product.find({}).exec().then((products) => {
    products.reduce((acc, index) => {
      acc.push(index);
      return acc;
    }, [])
    return categoryArray;
  })
}

// router params
router.param("product", function(req, res, next){
  req.product;
  next();
})
router.param("review", function(req, res, next){
  req.review;
  next();
})

// router.get(`/`, async (req, res, next) => {
//   //ex route 1 /products?page=1&category=tools&price=lowest&query=sleek frozen shoes
//   // example route 2 - /products?page=1&category=tools&price=highest

//   const categoriesArray = [];
//   // items per page and page variables
//   const perPage = 9;
//   const page = req.query.page || 1;
//   let priceSort = "asc";

//   const selectedCategory = '';

//   if(req.query.price === "highest"){
//     priceSort = 'desc'
//   } else {
//     priceSort = 'asc'
//   }

//   if(req.query.category != undefined){
//     Product.find({})
//     .where("category")
//     .equals(upperCaseFirstLetter(req.query.category))
//     .where()
//     .sort({ price: priceSort })
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .exec()
//     .then((products) => {
//       console.log("products")
//       console.log(products)
//       res.send(products);
//     })
//   } else {
//     Product.find({})
//     .sort({ price: priceSort })
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .exec()
//     .then((products) => {
//       res.send(products);
//     })
//   }

// })

// get route for all Products
router.get(`/products`, async (req, res, next) => {
  //ex route 1 /products?page=1&category=tools&price=lowest&query=sleek frozen shoes
  // example route 2 - /products?page=1&category=tools&price=highest

  const categoriesArray = populateProductCategories();
  console.log("categories: ")
  console.log(categoriesArray)
  // items per page and page variables
  const perPage = 9;
  const page = req.query.page || 1;
  let priceSort = "asc";

  const selectedCategory = '';

  if(req.query.price === "highest"){
    priceSort = 'desc'
  } else {
    priceSort = 'asc'
  }

  if(req.query.category != undefined){
    Product.find({})
    .where("category")
    .equals(upperCaseFirstLetter(req.query.category))
    .where()
    .sort({ price: priceSort })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()
    .then((products) => {
      console.log("products")
      console.log(products)
      res.send(products);
    })
  } else {
    Product.find({})
    .sort({ price: priceSort })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()
    .then((products) => {
      res.send(products);
    })
  }

})
// get route for specific product in products
router.get("/products/:product", (req, res, next) => {
  let product = Product.find({_id: req.params.product}).exec();
  product.then((product) => {
    res.send(product);
  })
})
// get route for reviews of product param
router.get("/products/:product/reviews", (req, res, next) => {
  let productReviews = Review.find({_id: req.params.product}).exec();
  productReviews.then((reviews) => {
    res.send(reviews);
  })
})
// post route for creating a new product to products page
router.post("/products", (req, res, next) => {
  let product = req.body.newProduct;
  if(!product.category || !product.name || !product.price || !product.image){
    res.writeHead(400, "Invalid product input");
    return res.end();
  }
  res.post(req.body.newProduct)
})
// post route for creating a new review in the database for the correct product's reviews array 
router.post("/products/:product/reviews", (req, res, next) => {
  let productReviews = Review.find({_id: req.params.product})
  res.post(req.body.newReview)
})
// deletes product by param product's id
router.delete("/products/:product", (req, res, next) => {
  Product.findByIdAndDelete(req.params.product)
  res.delete(req.params.product)
})
// deletes review by param review's id
router.delete("/reviews/:review", (res, req, next) => {
  Review.findByIdAndDelete(req.params.review)
  res.delete(req.params.review)
})

module.exports = router;