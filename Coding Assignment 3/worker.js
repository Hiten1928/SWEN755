const { parentPort, workerData } = require('worker_threads')

const fib = n => {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

parentPort.on('message', param => {
  if (typeof param !== 'number') {
    throw new Error('Param must be a number')
  }
  const result = fib(param)
  console.log('Worker data is', workerData)

  parentPort.postMessage(result)
})

module.exports = {
  parse: function() {
    console.log('parse')
    return 1
  }
}
