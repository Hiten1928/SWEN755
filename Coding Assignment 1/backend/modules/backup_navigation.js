function generateCoordinates() {
  let minLongitude = -90.0
  let maxLongitude = 90.0
  let minLatitude = 0.0
  let maxLatitude = 180.0

  let latitude = minLatitude + Math.random() * (maxLatitude - minLongitude + 1)
  let longitude =
    minLongitude + Math.random() * (maxLongitude - minLongitude + 1)
  // if (latitude > 89.0 && longitude < 0.2) {
  //   console.log('Critical process died')
  // } else {
  return { latitude, longitude }
  //}
}

function init() {
  let heartBeatCheck = generateCoordinates()
  if (heartBeatCheck) {
    process.send({
      latitude: heartBeatCheck.latitude,
      longitude: heartBeatCheck.longitude,
      msg: 'I am alive'
    })
    setTimeout(() => {
      init()
    }, 2000)
  } else {
  }
}
module.exports = {
  init
}
