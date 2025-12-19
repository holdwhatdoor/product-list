require('dotenv').config()
const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')

const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy

// Create local strategy
const localOptions = { 
  usernameField: 'username',
  passwordField: 'password',
 };

const localLogin = new LocalStrategy(localOptions, 
  async function(username, password, done) {

  try{
    const user = await User.findOne({ username: username }).exec()
    if(!user){ return done(null, false) }
    const passwordValid = await user.validPassword(password)
    if(!passwordValid) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user)
  } catch (err) {
  }
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

// JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  try{
    const user = await User.findOne({username: payload.sub}).exec()
    if(user){
      done(null, user)
    } else {
      done(null, false)
    }
  } catch(err){
  }

})

passport.use(jwtLogin);
passport.use(localLogin);


