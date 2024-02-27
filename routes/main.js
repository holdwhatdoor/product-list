const router = require("express").Router();
// const faker = require("faker");
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

// router params
router.param("product", function(req, res, next){
  req.product;
  next();
})
// get route for all Products
router.get("/products", (req, res, next) => {
  let productsQuery = Product.find({}).exec();
  productsQuery.then((products) => {
    res.send(products);
  })
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
  let product = req.body;
  res.send(req.body)
})
// post route for creating a new review in the database for the correct product's reviews array 
router.post("/products/:product/reviews", (req, res, next) => {

})
// deletes product by param product's id
router.delete("/products/:product", (req, res, next) => {

})
// deletes review by param review's id
router.delete("/reviews/:review", (res, req, next) => {

})

module.exports = router;