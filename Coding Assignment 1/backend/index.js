const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', msg => {
      console.log(`${msg.pid} :: isAlive: ${msg.isAlive}`)
    })
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })

  setInterval(() => {
    for (const id in cluster.workers) {
      cluster.workers[id].send({
        type: 'isAlive'
      })
    }
  }, 5000)
} else {
  http
    .createServer((req, res) => {
      console.log(req.url, process.pid)
      res.writeHead(200)
      res.end('Hello world\n')
    })
    .listen(8000)
  process.on('message', msg => {
    if (msg.type === 'isAlive') {
      process.nd({
        isAlive: true,
        pid: process.pid
      })
    }
  })
  console.log(`Worker ${process.pid} started`)
}
