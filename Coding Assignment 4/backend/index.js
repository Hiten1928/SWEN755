const config = require('config')
const mongoose = require('mongoose')
// const usersRoute = require('./routes/users.route')
const adminRoute = require('./routes/admin.route')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

if (!config.get('myprivatekey')) {
  console.error('ERROR: Config is missing required myprivatekey')
  process.exit(1)
}

// connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/nodejsauth', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Cannot connect to MongoDB', err))

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
