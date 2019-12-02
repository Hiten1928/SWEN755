const bcrypt = require('bcryptjs')
const { User, validate } = require('../models/user.model')
const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email })

  if (!user) return res.status(400).send("User doesn't exists")
  let authenticated = await bcrypt.compare(req.body.password, user.password)
  if (authenticated) {
    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      'x-auth-token': token
    })
  } else {
    res.status(400).send({ error: 'Password is incorrect' })
  }
})

module.exports = router
