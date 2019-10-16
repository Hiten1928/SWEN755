const cluster = require('cluster')
const navigation = require('./modules/navigation')
const expirationTime = 6
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let data = {
  navigation: {
    last_seen: new Date()
  }
}

if (cluster.isMaster) {
  // Creating a child child process
  cluster.fork()
  for (let id in cluster.workers) {
    console.log(id)
    cluster.workers[id].on('message', msg => {
      io.emit('msg', {
        latitude: msg.latitude,
        longitude: msg.longitude,
        msg: msg.msg
      })
      // console.log(msg.latitude, msg.longitude, msg.msg)
      data.navigation.last_seen = new Date()
    })
  }
  // check the status of child process
  const checkInterval = () => {
    var currentTime = new Date()
    lastUpdatedTime = data.navigation.last_seen
    let differenceInSeconds =
      (currentTime.getTime() - lastUpdatedTime.getTime()) / 1000
    if (differenceInSeconds > expirationTime) {
      // send not working to frontend
      io.emit('msg', 'heart not beating')
    } else {
      //Do Nothing
      console.log('in else')
    }
    setTimeout(() => {
      checkInterval()
    }, 2000)
  }
  checkInterval()
  // create the app
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/', '/index.html')
  })

  app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js')
  })

  io.on('connection', socket => {
    console.log('a user connected')
  })

  http.listen(3000, () => {
    console.log('server started')
  })
} else {
  navigation.init()
}
