const jwt = require('jsonwebtoken');
const config = require('../config')

function isAuth(req, res, next) {
  const token = req.header('x-auth');
  if(!token) return res.status(401).json({message:'unauthorized'});

  try{
    const decode = jwt.verify(token, config.secret);
    req.user = decode;
    next();
  }catch(e) {
    res.status(400).json({message:'you are not allowed to access this resource '});
  }
};

module.exports = isAuth;
