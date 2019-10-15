const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length
const navigation = require('./modules/navigation')
const communication = require('./modules/communication')
const imageprocessing = require('./modules/imageprocessing')
const modules = ['navigation', 'communications', 'imageprocessing']

var lastUpdatedTime
const expirationTime = 6

function updateTime() {
  var currentTime = new Date()
  lastUpdatedTime = navigation.navObj.time
  console.log('lastupdatedTime', lastUpdatedTime)
  console.log(currentTime.getSeconds() - lastUpdatedTime.getSeconds())
  if (
    currentTime.getSeconds() - lastUpdatedTime.getSeconds() >
    expirationTime
  ) {
    console.log('heart not beating')
  } else {
    //Do Nothing
  }
  setTimeout(updateTime, 2000)
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  // fork workers
  modules.forEach(mod => {
    cluster.fork({
      moduleType: mod
    })
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  switch (process.env.moduleType) {
    case 'navigation':
      navigation.init()
      updateTime()
      break
    case 'communications':
      communication.init()
      break
    case 'imageprocessing':
      imageprocessing.init()
      break
  }
}
