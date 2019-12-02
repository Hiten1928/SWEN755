const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'] || req.headers['authorization']
  if (!token) return res.status(401).send('Access denied, user not logged in')

  try {
    const decoded = jwt.verify(token, config.get('myprivatekey'))
    if (decoded.role === 'admin') {
      req.user = decoded
      next()
    } else {
      res.status(401).send('Access denied, user not authorized to do this')
    }
  } catch (ex) {
    res.status(400).send('Access denied, invalid token provided')
  }
}
