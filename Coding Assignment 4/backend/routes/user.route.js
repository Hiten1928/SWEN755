const userAuth = require('../middleware/userAuth')
const bcrypt = require('bcryptjs')
const { User, validate } = require('../models/user.model')
const express = require('express')
const router = express.Router()
// Things that a user can do

// 1. Create new Guest
router.post('/newUser', userAuth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // find an existing user
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered')

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: 'guest'
  })
  user.password = await bcrypt.hash(user.password, 10)
  await user.save()

  res.send({
    success: 'Guest created',
    email: user.email
  })
})

// 2. Edit user
router.post('/editUser', userAuth, async (req, res) => {
  let user = await User.findOne({ _id: req.body._id, role: 'guest' })
  if (!user) return res.status(400).send("Guest doesn't exists")

  user.name = req.body.name
  user.email = req.body.email
  if (req.body.password) {
    user.password = req.body.password
    user.password = await bcrypt.hash(user.password, 10)
  }
  await user.save()
  res.send({ success: 'Guest edited successfully', email: user.email })
})

// 3. Delete user
router.delete('/deleteUser', userAuth, async (req, res) => {
  let user = await User.findOne({ _id: req.body._id, role: 'guest' })
  if (!user) return res.status(400).send("User doesn't exists")

  await user.remove()

  res.send({
    success: 'User removed successfully'
  })
})

// View all users
router.get('/getUsers', userAuth, async (req, res) => {
  let users = await User.find({ role: 'guest' }).select('-password')
  let usersRes = []

  users.forEach(item => {
    usersRes.push({
      _id: item._id,
      name: item.name,
      email: item.email,
      role: item.role
    })
  })

  res.send(usersRes)
})

// 2. Change settings

module.exports = router
