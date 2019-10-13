const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length
const navigation = require('./modules/navigation')
const communication = require('./modules/communication')

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  const modules = ['navigation', 'communications', 'controls']
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
      break
    case 'communications':
      communication.init()
      break
  }
}
