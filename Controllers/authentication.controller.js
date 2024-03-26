const TeacherModel = require('../Models/teacher.model');
const createToken = require('../utils/create_token.util');
const comparingPassword = require('../utils/compare_Password.util');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const target = await TeacherModel.findOne({ email });
      if (target) {
        const isMatchedPassword = await comparingPassword(
          password,
          target.password
        );
        if (isMatchedPassword) {
          const token = createToken(target);
          return res.json({ message: 'You are Authenticated', token });
        }
      }
      res.status(401).json({ message: 'Your email or password is incorrect' });
    } catch (error) {
      next(error);
    }
  }

  logout(req, res, next) {
    req.headers.authorization = '';
    res.status(200).json({ message: 'Logged out Successfully' });
  }

  async changePassword(req, res, next) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const target = await TeacherModel.findOne({ email });
      if (target) {
        const isMatchedPassword = await comparingPassword(
          oldPassword,
          target.password
        );
        console.log(isMatchedPassword);
        if (isMatchedPassword) {
          target.password = newPassword;
          await target.save();
          return res
            .status(200)
            .json({ data: target, message: 'Password is updated' });
        }
      }
      res.status(401).json({ message: 'Your email or password is incorrect' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
