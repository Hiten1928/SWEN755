const {
  Worker,
  isMainThread,
  parentPort,
  workerData
} = require('worker_threads')
const perf = require('execution-time')()
// set up for primes

const min = 2
let primes = []

/**
 *
 * @param {number} start
 * @param {number} range
 */
function generatePrimes(start, range) {
  perf.start()
  let isPrime = true
  let end = start + range
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false
        break
      }
    }
  }
  if (isPrime) {
    primes.push(i)
  }
  isPrime = true
  const results = perf.stop()
  console.log(`Time taken: ${results.time}ms`)
}

if (isMainThread) {
  // create the worker
  const max = 1e7
  const threadCount = +process.argv[2] || 2
  const threads = new Set()
  console.log(`running with ${threadCount} threads...`)
  const range = Math.ceil((max - min) / threadCount)
  let start = min
  for (let i = 0; i < threadCount - 1; i++) {
    const myStart = start
    threads.add(
      new Worker(__filename, { workerData: { start: myStart, range } })
    )
    start += range
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) }
    })
  )
  for (let worker of threads) {
    worker.on('error', err => {
      throw err
    })
    worker.on('exit', () => {
      threads.delete(worker)
      console.log(`Thread exiting, ${threads.size} running...`)
      if (threads.size === 0) {
        console.log(primes.join('\n'))
      }
    })
    worker.on('message', msg => {
      primes = primes.concat(msg)
    })
  }
} else {
  generatePrimes(workerData.start, workerData.range)
  parentPort.postMessage(primes)
}
