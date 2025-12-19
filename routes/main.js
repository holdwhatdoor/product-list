const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");
const User = require('../models/user');
const Authentication = require('../controllers/authentication')
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false, failWithError: false });

/**
 *  function to initially populate database with 90 random products 
 */
// const { faker } = require("@faker-js/faker")
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
// items to be loaded per page
const perPage = 9;
// global empty variables to be populated for authorized users
const products = [];
const productCategories = [];
const selectedProduct = {};
const user = {};

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
function clearProducts(productsArray) {
  productsArray.splice(0, productsArray.length);
}

/** async functions that query the database */ 
// populates global products array with data returned from database
async function populateProductsReturned(productsArray, category, sortedPrice, searchQuery){
  switch(true){
    case ((category != undefined) && (searchQuery === undefined)):
      await Product.find({})
      .where("category")
      .equals(upperCaseFirstLetter(category))
      .exec()
      .then((product) => {
        clearProducts(productsArray);
        productsArray.push(product);
      })
    break;
    case ((category === undefined) && (searchQuery === undefined) && (sortedPrice != undefined)):
      await Product.find({})
      .sort({ price: sortedPrice })
      .exec()
      .then((product) => {
        clearProducts(productsArray);
        productsArray.push(product);
      })
    break;
    case ((category != undefined) && (sortedPrice != undefined) && (searchQuery === undefined)):
      await Product.find({})
      .where("category")
      .equals(upperCaseFirstLetter(category))
      .sort({ price: sortedPrice })
      .exec()
      .then((product) => {
        clearProducts(productsArray);
        productsArray.push(product);
      })
    break;
    case ((category === undefined) && (searchQuery != undefined)):
      let searchQueryRegEx = new RegExp(searchQuery, 'i');
      await Product.find({})
      .where("name")
      .regex(searchQueryRegEx)
      .exec()
      .then((product) => {
        clearProducts(productsArray);
        productsArray.push(product)
      })
      break;
      case ((category != undefined) && (searchQuery != undefined)):
        let searchQueryRegEx2 = new RegExp(searchQuery, 'i');
        await Product.find({})
        .where("name")
        .regex(searchQueryRegEx2)
        .where("category")
        .equals(upperCaseFirstLetter(category))
        .sort({ price: sortedPrice })
        .exec()
        .then((product) => {
          clearProducts(productsArray);
          productsArray.push(product);
        })
        break;
    default:
      await Product.find({})
      .exec()
      .then((product) => {
        clearProducts(productsArray);
        productsArray.push(product);
      })
    break;
  }
}

// populates global categories array variable with all the different categories from database
async function populateProductCategories(categories){ 
  await Product.find({}).exec().then((products) => {
    products.forEach((product) => {
      if(!categories.includes(product.category)){
        categories.push(product.category);
      }
    })
  })
  categories.sort();
  return categories;
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
router.param("user", function (req, res, next){
  req.user;
  next()
})
router.param("product", function(req, res, next){
  req.product;
  next();
})
router.param("review", function(req, res, next){
  req.review;
  next();
})

// get route for user login
// router.get('/login', async (req, res, next) => {
//   try{
//     const existingUser = await checkUserExists(req.query.username)
//     if(existingUser){
//       await authenticateUserLogin(req.query.username, req.query.password)
//     }else{
//       alert(`User with username: ${req.query.username} does not exist`)
//     }

//   }
//   catch{

//   }
// })

router.post('/signup', Authentication.signup)

// need to figure out issue with middleware not executing properly
router.post('/auth/login', requireSignin, Authentication.login )

// using callback function and not multiple middleware like above route
// router.post('/auth/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json({ error: info.message || 'Login failed' });
//     // Skip req.logIn since you're using JWTs
//     return res.json({ token: Authentication.tokenForUser(user) });
//   })(req, res, next);
// });

router.get('/auth/:user', requireAuth, Authentication.currentUser)
router.get('/auth/:user/cart', requireAuth, Authentication.currentUser)
router.get('/auth/:user/products', requireAuth, Authentication.currentUser)
router.get('/auth/:user/products/:product', requireAuth, Authentication.currentUser)
router.post('/auth/:user/products/:product/reviews/:review')


// get route for all Products
router.get('/products', async (req, res, next) => {
  try{
    // populate products and productCategories arrays with database data
    await populateProductsReturned(products, req.query.category, req.query.price, req.query.query);
    await populateProductCategories(productCategories);

    // req.query result variables
    const currentPage = Number(req.query.page) || 1;
    const priceSort = req.query.price;
    const selectedCategory = req.query.category;
    const querySearch = req.query.query;
    let totalPages = getTotalPages(products[0]);

    // switch case for optional parameters
    switch(true){
      case ((selectedCategory != undefined ) && (querySearch != undefined)):
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
            priceSort: priceSort,
          };
          res.send(data);
        })
      break;
      case ((selectedCategory != undefined || "Categories")):
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
            priceSort: priceSort,
          };
          res.send(data);
        })
      break;
      case (querySearch != undefined):
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
            priceSort: priceSort,
            category: selectedCategory
          };
          res.send(data);
        })
      break;
      default:
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
            priceSort: priceSort,
          };
          res.send(data);
        })
      break;
    }
  } catch (err) {

  }
})

// get route for specific product in products
router.get("/products/:product", async (req, res, next) => {
  try {
    let productId = req.params.product.substring(0, req.params.product.length);
    await Product
      .find({ _id: productId  })
      .populate("reviews")
      .exec()
      .then((product) => {
        res.send(product);
      })

  } catch (error) {
  }
})

// post route for creating a new product to products page
router.post("/products", async (req, res, next) => {
  try {
    let product = req.body.newProduct;
    if(!product.category || !product.name || !product.price || !product.image){
    res.writeHead(400, "Invalid product input");
    return res.end();
  }
  res.post(req.body.newProduct)   
  } catch (error) {
    
  }
})
// post route for creating a new review in the database for the correct product's reviews array 
router.post("/products/:product", async (req, res, next) => {
  try {
    const review = new Review({
      userName: req.body.userName,
      text: req.body.text,
      productId: req.params.product
    })

    const product = await Product.find({_id: req.params.product}).exec()
    if(!product){
      return res.status(404).send({error: "Product not Found"})
    } else {
      review.save();
      await Product.updateOne({_id: req.params.product}, { $push: { reviews: review._id}})
      return res.status(201).send(review).end()
    }
  } catch (error) {
    res.status(400).send("error")
  }
})

// update product by param product id
router.put("/products/:product", async (req, res, next) => {
  try{
    return res.status(200).send()
  } catch {

  }
})
// update product review by param review id
router.put("/products/:product/reviews/:review", async (req, res, next) => {
  try {
    await Review.findByIdAndUpdate(req.params.review, 
      {$set: { text: req.body.text }},
      {new: true}
    ).exec()
    await Product.findById(product).populate('reviews').exec()
    
  
    return res.status(200).send(`Review id: ${req.params.review} updated`)
  } catch {

  }
})

// deletes product by param product's id
router.delete("/products/:product", async (req, res, next) => {
  try {
  } catch (err) {
  }

})
// deletes review by param review's id
router.delete("/products/:product/reviews/:review", async (req, res, next) => {
  try{
    await Product.updateOne(
      {_id: req.params.product}, 
      { $pull: {reviews: req.params.review} })
      .exec()
    await Review.findByIdAndDelete(req.params.review).exec()
    return res.send(`Review with id: ${req.params.review} has been deleted.`)
  } catch(err) {

  }
})

module.exports = router;