const cluster = require('cluster')
const navigation = require('./modules/navigation')
const expirationTime = 6
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
      console.log(msg.latitude, msg.longitude, msg.msg)
      data.navigation.last_seen = new Date()
    })
  }
  // check the status of child process
  const checkInterval = () => {
    var currentTime = new Date()
    lastUpdatedTime = data.navigation.last_seen
    // console.log('lastupdatedTime', lastUpdatedTime)
    // console.log(currentTime.getSeconds() - lastUpdatedTime.getSeconds())
    let differenceInSeconds =
      (currentTime.getTime() - lastUpdatedTime.getTime()) / 1000
    console.log(differenceInSeconds)
    if (differenceInSeconds > expirationTime) {
      // send not working to frontend
      console.log('heart not beating')
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
} else {
  navigation.init()
}
