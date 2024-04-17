const router = require("express").Router();
const product = require("../models/product");
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

// global variables 
const perPage = 9;
// global empty variables to be populated
const products = [];
const productCategories = [];

/** General functions */
// capitalizes first letter of string 
const upperCaseFirstLetter = (string) => {
  if(string !== undefined || string !== ""){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

// determines total number of browser pages for given set of products data returned from the database query
function getTotalPages(products){
  let totalPages = 0;
  if(products.length != 0){
    if((products.length % 9) > 0){
      totalPages = Math.floor((products.length/9) + 1);
    } else {
      totalPages = products.length/9;
    }
  }
  return totalPages;
}

// clears global variable array 'products' of all items
function clearProducts() {
  products.splice(0, products.length);
}

/** async functions that query the database */ 
// populates global products array with data returned from database
async function populateProductsReturned(category, sortedPrice, searchQuery){
  switch(true){
    case category != undefined:
      await Product.find({})
      .where("category")
      .equals(upperCaseFirstLetter(category))
      .exec()
      .then((product) => {
        clearProducts();
        products.push(product);
      })
    break;
    case sortedPrice != undefined && category === undefined && searchQuery === undefined:
      await Product.find({})
      .sort({ price: sortedPrice })
      .exec()
      .then((product) => {
        clearProducts();
        products.push(product);
      })
    break;
    case category != undefined && sortedPrice != undefined && searchQuery === undefined:
      await Product.find({})
      .where("category")
      .equals(upperCaseFirstLetter(category))
      .sort({ price: sortedPrice })
      .exec()
      .then((product) => {
        clearProducts();
        products.push(product);
      })
    break;
    case searchQuery != undefined:
      let searchQueryRegEx = new RegExp(searchQuery, 'i');
      await Product.find({})
      .where("name")
      .regex(searchQueryRegEx)
      .exec()
      .then((product) => {
        clearProducts();
        products.push(product)
      })
      break;
    default:
      await Product.find({})
      .exec()
      .then((product) => {
        clearProducts();
        products.push(product);
      })
    break;
  }
}

// populates global categories array variable with all the different categories from database
async function populateProductCategories(){ 
  await Product.find({}).exec().then((products) => {
    products.forEach((product) => {
      if(!productCategories.includes(product.category)){
        productCategories.push(product.category);
      }
    })
  })
  productCategories.sort();
  return productCategories;
}

/** functions for processing returned data from database */ 
// retrieves the price sort selection from user input
function getPriceSortToggle(sortToggle){
  switch (true){
    case (sortToggle === "highest"):
      return "desc";
    case (sortToggle === "lowest"):
      return "asc";
    default:
      return "desc";
  }
}

// gets product id from product name
async function productIdFromNameQuery(productNameQuery){
  let id = productNameQuery.substring(1, productNameQuery.length);
  let productFromId = {};
  await Product.find({})
    .where("_id")
    .equals(id)
    .exec()
    .then((productId) => {
      productFromId = productId
      res.send(productId)
    })
    return productFromId;
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

// get route for all Products
router.get('/products', async (req, res, next) => {
  //ex route 1 /products?page=1&category=tools&price=lowest&query=sleek frozen shoes
  // example route 2 - /products?page=1&category=tools&price=highest
  try{
    // populate products and productCategories arrays with database data
    await populateProductsReturned(req.query.category, getPriceSortToggle(req.query.price), req.query.query);
    await populateProductCategories();

    // req.query result variables
    const currentPage = req.query.page || 1;
    const priceSort = getPriceSortToggle(req.query.price);
    const selectedCategory = req.query.category;
    const querySearch = req.query.query;
    let totalPages = 0;
    console.log()
    // switch case for optional parameters
    switch(true){
      case ((selectedCategory != undefined) && (querySearch != undefined)):
        console.log("selectedCat & querySearch != undefined")
        console.log(req.query)
        totalPages = getTotalPages(products[0])
        let queryRegexCase1 = new RegExp(querySearch, 'i');
        await Product.find({})
        .where("name")
        .regex(queryRegexCase1)
        .where("category")
        .equals(upperCaseFirstLetter(selectedCategory))
        .sort({ price: priceSort })
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .exec()
        .then((products) => {
          const data = {
            categories: productCategories,
            products: products,
            currentPage: currentPage,
            category: selectedCategory,
            query: querySearch,
            totalPages: totalPages,
          };
          res.send(data);
        })
      break;
      case ((selectedCategory != undefined)):
        console.log("selectedCategory != undefined")
        console.log(req.query)
        totalPages = getTotalPages(products[0])
        await Product.find({})
        .where("category")
        .equals(upperCaseFirstLetter(selectedCategory))
        .sort({ price: priceSort })
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .exec()
        .then((products) => {
          const data = {
            categories: productCategories,
            products: products,
            currentPage: currentPage,
            category: selectedCategory,
            totalPages: totalPages,
          };
          res.send(data);
        })
      break;
      case (querySearch != undefined):
        console.log("querySearch != undefined")
        console.log(req.query)
        totalPages = getTotalPages(products[0]);
        let queryRegexCase3 = new RegExp(querySearch, 'i');
        await Product.find({})
        .where("name")
        .regex(queryRegexCase3)
        .sort({ price: priceSort })
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .exec()
        .then((products) => {
          const data = {
            categories: productCategories,
            products: products,
            currentPage: currentPage,
            query: querySearch,
            totalPages: totalPages,
          };
          res.send(data);
        })
      break;
      default:
        console.log("default case")
        console.log(req.query)
        totalPages = getTotalPages(products[0]);
        await Product.find({})
        .sort({ price: priceSort })
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .exec()
        .then((products) => {
          const data = {
            categories: productCategories,
            products: products,
            currentPage: currentPage,
            totalPages: totalPages,
            category: selectedCategory,
          };
          res.send(data);
        })
      break;
    }
  } catch (err) {

  }
})
// get route for specific product in products
router.get("/products/:product", (req, res, next) => {
  let productId = req.params.product.substring(1, req.params.product.length);
  Product.find({ _id: productId  }).exec().then((product) => {
    res.send(product);
  })
})
// get route for reviews of product param
router.get("/products/:product/reviews", (req, res, next) => {
  let productId = req.params.product.substring(1, req.params.product.length);
  Product.find({_id: productId}).exec().then((product) => {
    res.send(product.reviews);
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
  let productId = productIdFromNameQuery(req.params.product.name)
  Product.findByIdAndDelete(productId)
  res.delete(req.params.product)
})
// deletes review by param review's id
router.delete("/reviews/:review", (res, req, next) => {
  Review.findByIdAndDelete(req.params.review)
  res.delete(req.params.review)
})

module.exports = router;