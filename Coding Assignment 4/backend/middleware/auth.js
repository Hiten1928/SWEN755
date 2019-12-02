const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // get the token from the header if present
  const token = req.headers['x-access-token'] || req.headers['authorization']
  // if no token found, return response
  if (!token) return res.status(401).send('Access denied. No token provided')

  try {
    // if can verify token, set user and pass to the next middleware
    const decoded = jwt.verify(token, config.get('myprivatekey'))
    req.user = decoded
    next()
  } catch (ex) {
    // invalid token
    res.status(400).send('Invalid token.')
  }
}
