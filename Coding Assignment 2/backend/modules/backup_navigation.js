let flag = true

function generateCoordinates() {
  let minLongitude = -90.0
  let maxLongitude = 90.0
  let minLatitude = 0.0
  let maxLatitude = 180.0
  let latitude, longitude
  if (process.env.lastData && flag) {
    flag = false
    let syncData = JSON.parse(process.env.lastData)
    latitude = syncData.latitude
    longitude = syncData.longitude
    return { latitude, longitude }
  }

  latitude = minLatitude + Math.random() * (maxLatitude - minLongitude + 1)
  longitude = minLongitude + Math.random() * (maxLongitude - minLongitude + 1)
  return { latitude, longitude }
}

function init() {
  let heartBeatCheck = generateCoordinates()
  console.log('heartbeatCheck', heartBeatCheck)
  if (heartBeatCheck) {
    process.send({
      latitude: heartBeatCheck.latitude,
      longitude: heartBeatCheck.longitude,
      msg: 'I am alive in backup'
    })
  } else {
  }
  setTimeout(() => {
    init()
  }, 2000)
}

module.exports = {
  init
}
