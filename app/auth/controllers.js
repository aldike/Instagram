const sendEmail = require('../utils/sendMail')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthCode = require('./AuthCode')
const User = require('./User')
const secretKey = require('../../config/crypto');
const passport = require('../auth/passport');

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const code = "INST" + Date.now();

    await AuthCode.create({
      email: email,
      code: code,
      valid_till: Date.now() + 120000
    });

    sendEmail(email, "Код авторизации instagram", code);

    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the verification code' });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const authCode = await AuthCode.findOne({
      where: { email },
      order: [['valid_till', 'DESC']],
    });

    if (!authCode) {
      return res.status(401).json({ error: 'Invalid code' });
    } else if (new Date(authCode.valid_till).getTime() < Date.now()) {
      return res.status(401).json({ error: 'Code expired' });
    } else if (authCode.code !== code) {
      return res.status(401).json({ error: 'Invalid code' });
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, username: undefined, password: undefined });
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey);
      console.log("🚀 ~ file: controllers.js:53 ~ verifyCode ~ token:", token)
      res.setHeader('Authorization', `Bearer ${token}`);
      return res.status(200).json({ message: 'User created successfully' });
    } else {
      return res.status(200).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while verifying the code' });
  }
};

const createUsernamePassword = async (req, res) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while authenticating' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { username, password } = req.body;
    const email = user.email;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      let foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      foundUser.username = username;

      const hashedPassword = await bcrypt.hash(password, 10);
      foundUser.password = hashedPassword;

      await foundUser.save();

      res.status(200).json({ message: 'Username and password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the username and password' });
    }
  })
  (req, res);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ prompt: 'Authorization successful' });
  };

module.exports = {
    sendVerificationEmail,
    verifyCode,
    createUsernamePassword,
    loginUser
}