module.exports = {
  init: () => {
    console.log(`I am ${process.env.moduleType} from process ${process.pid}`)
    setTimeout(() => {}, 5000)
  }
}
