var syncData = process.env.lastData

//Constructor
// function backup_navigation(Data) {
//   let temp = Data
//   syncData = temp
// }

function generateCoordinates() {
  let minLongitude = -90.0
  let maxLongitude = 90.0
  let minLatitude = 0.0
  let maxLatitude = 180.0
  let latitude, longitude

  if (syncData) {
    console.log('sync3', syncData)
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
  // backup_navigation
}
