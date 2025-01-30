const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const schemaSignUp = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  },
})


function validateSignUp(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    email: Joi.string().required().email().min(3),
    password: Joi.string().required().min(3).max(250)
    // password: Joi.string().required().password().min(3).max(250)
  })
  
  return schema.validate(user);
}

schemaSignUp.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'), {
    expiresIn: '24h'
  });
  return token;
}
const SignUp = mongoose.model('SignUp', schemaSignUp);

exports.SignUp = SignUp;
exports.validateSignUp = validateSignUp;