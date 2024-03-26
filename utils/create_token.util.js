const jwt = require('jsonwebtoken');

module.exports = (target) => {
  return jwt.sign(
    { id: target._id, role: target.role },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
};
