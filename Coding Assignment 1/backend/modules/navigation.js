var navObj = {
  msg: "I'm alive",
  time: new Date()
}

function generateCoordinates() {
  let minLongitude = -90.0
  let maxLongitude = 90.0
  let minLatitude = 0.0
  let maxLatitude = 180.0

  let latitude = minLatitude + Math.random() * (maxLatitude - minLongitude + 1)
  let longitude =
    minLongitude + Math.random() * (maxLongitude - minLongitude + 1)

  console.log('latitude', latitude, 'longitude', longitude)

  if (latitude > 89.8 && longitude < 0.2) {
    console.log('Critical process died')
    return false
  } else {
    return true
  }
}

function init() {
  let heartBeatCheck = generateCoordinates()
  console.log('heartBeatCheck', heartBeatCheck)
  if (heartBeatCheck) {
    navObj.time = new Date()
    setTimeout(init, 2000)
  } else {
    console.log('died')
  }
}
module.exports = {
  init: () => {
    init()
  },
  navObj
}
