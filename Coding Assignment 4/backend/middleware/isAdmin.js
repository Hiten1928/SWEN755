module.exports = (req, res, next) => {
  const { role } = req.user
  if (role && role === 'admin') {
    next()
  } else {
    res.status(401).send('Unauthorized to create a user, contact your admin')
  }
}
