const TeacherModel = require('../Models/teacher.model');
const jwt = require('jsonwebtoken');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const target = await TeacherModel.findOne({ email, password });
      if (!target) {
        throw new Error('Your email or password is incorrect');
      }

      let token = jwt.sign(
        {
          _id: target._id,
          role: target.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      res.json({ message: 'You are Authenticated', token });
    } catch (error) {
      next(error);
    }
  }

  logout(req, res, next) {
    req.headers.authorization = '';
    res.status(200).json({ message: 'Logged out Successfully' });
  }
}

module.exports = new AuthController();
