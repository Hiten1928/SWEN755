const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
})

// custom menthod to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get('myprivatekey')
  )
  return token
}

const User = mongoose.model('User', UserSchema)

// function to validate user
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  })

  return schema.validate(user)
}

exports.User = User
exports.validate = validateUser
