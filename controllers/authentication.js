const jwt = require('jwt-simple')
const User = require('../models/user')

const tokenForUser = function(user){
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }
  return jwt.encode({ sub: user.username,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, process.env.ACCESS_TOKEN_SECRET)
}

const searchQuery = async (req, res, next) => {
  try{
    return req.query.query
  } catch (err){
  }
}

// populates global categories array variable with all the different categories from database
async function populateProductCategories(){ 
  const categories = [];
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

async function productsReturned(category, sortedPrice, searchQuery){
  const productsArray = [];
  switch(true){
    case ((category != undefined) && (searchQuery === undefined)):
      await Product.find({})
      .where("category")
      .equals(upperCaseFirstLetter(category))
      .exec()
      .then((product) => {
        productsArray.push(product);
        return productsArray;
      })
    break;
    case ((category === undefined) && (searchQuery === undefined) && (sortedPrice != undefined)):
      await Product.find({})
      .sort({ price: sortedPrice })
      .exec()
      .then((product) => {
        productsArray.push(product);
        return productsArray;
      })
    break;
    case ((category != undefined) && (sortedPrice != undefined) && (searchQuery === undefined)):
      await Product.find({})
      .where("category")
      .equals(upperCaseFirstLetter(category))
      .sort({ price: sortedPrice })
      .exec()
      .then((product) => {
        productsArray.push(product);
        return productsArray;
      })
    break;
    case ((category === undefined) && (searchQuery != undefined)):
      let searchQueryRegEx = new RegExp(searchQuery, 'i');
      await Product.find({})
      .where("name")
      .regex(searchQueryRegEx)
      .exec()
      .then((product) => {
        productsArray.push(product)
        return productsArray
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
          productsArray.push(product)
          return productsArray
        })
        break;
    default:
      await Product.find({})
      .exec()
      .then((product) => {
        productsArray.push(product)
        return productsArray
      })
    break;
  }
}

exports.login = async function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  if (!req.user) {
      return res.status(401).send({ error: 'Authentication failed' });
  }else{
    res.send({
      token: tokenForUser(req.user)
    });
  }
};

exports.currentUser = function(req, res) {

  try{
    const data = {
      user : {
      username: req.user.username,
      token: tokenForUser(req.user),
      cart: req.user.cart,
      },
      products: productsReturned(req.query.category, req.query.price, req.query.query),
      productCategories: populateProductCategories(),
    }
    res.send(data);
  } catch (err) {
  }
};

exports.signup = async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide username and password'});
  }

  // See if a user with the given email exists
  try{
    const existingUser = await User.findOne({ username: username }).exec();
    // If a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Username already exists' })
    } else {
      // If a user with email does NOT exist, create and save user record
      const user = new User();
      user.username = username;
      user.setPassword(password);
      user.save()
      res.json({ token: tokenForUser(user) })
    }

  } catch(err){
  }
  
};
