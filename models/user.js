const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var crypto = require ('crypto')

const UserSchema = new Schema({
  username: {type: String, unique: true, lowercase: true},
  hash: String,
  salt: String,
  cart: [{type: Schema.Types.ObjectId, ref: "Product" }],
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
}

module.exports = mongoose.model("User", UserSchema);