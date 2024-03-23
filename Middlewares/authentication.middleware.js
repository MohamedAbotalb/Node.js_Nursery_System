const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
  try {
    let token = req.get('authorization').split(' ')[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.token = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
};

const isAdmin = (req, res, next) => {
  const { role } = req.token;
  if (role == 'admin') {
    next();
  } else {
    throw new Error('You are not authorized to access this data');
  }
};

const isTeacherOrAdmin = (req, res, next) => {
  const { role } = req.token;
  if (role === 'teacher' || role === 'admin') {
    next();
  } else {
    throw new Error('You are not authorized to access this data');
  }
};

module.exports = { isAuthorized, isAdmin, isTeacherOrAdmin };
