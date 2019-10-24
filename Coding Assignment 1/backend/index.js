const cluster = require('cluster')
const navigation = require('./modules/navigation')
const backup_navigation = require('./modules/backup_navigation')
const expirationTime = 4
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const checkingTime = 2000

let data = {
  navigation: {
    last_seen: new Date()
  }
}

if (cluster.isMaster) {
  // Creating a child child process
  const worker = cluster.fork({
    moduleType: 'navigation'
  })
  worker.on('message', msg => {
    io.emit('msg', {
      latitude: msg.latitude,
      longitude: msg.longitude,
      msg: msg.msg
    })
    console.log(msg.latitude, msg.longitude, msg.msg)
    data.navigation.last_seen = new Date()
  })

  worker.on('disconnect', () => {
    const backup = cluster.fork({
      moduleType: 'backup_navigation'
    })
    io.emit('msg', 'the process died')
    backup.on('message', msg => {
      io.emit('msg', {
        latitude: msg.latitude,
        longitude: msg.longitude,
        msg: msg.msg
      })
      console.log(msg.latitude, msg.longitude, msg.msg)
    })
  })
  // check the status of child process
  const checkInterval = () => {
    var currentTime = new Date()
    lastUpdatedTime = data.navigation.last_seen
    let differenceInSeconds =
      (currentTime.getTime() - lastUpdatedTime.getTime()) / 1000
    if (differenceInSeconds > expirationTime) {
      // send not working to frontend
      io.emit('msg', 'Failure in Critical Process')
    } else {
      //Do Nothing
      // console.log('in else')
    }
    setTimeout(() => {
      checkInterval()
    }, checkingTime)
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
  console.log(`Initialized the navigation system: ${process.pid}`)
  console.log(process.env.moduleType)
  if (process.env.moduleType == 'navigation') {
    console.log('in navigation')
    navigation.init()
  }
  if (process.env.moduleType == 'backup_navigation') {
    backup_navigation.init()
  }
}
