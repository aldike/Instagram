const sendEmail = require('../utils/sendMail')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthCode = require('./AuthCode')
const User = require('./User')

const secretKey = crypto.randomBytes(32).toString('hex');

const sendVerificationEmail = (req, res) =>{

    const code = "INST"+Date.now()

    AuthCode.create({
        email: req.body.email,
        code: code,
        valid_till: Date.now() + 120000
    })
    sendEmail(req.body.email, "Код авторизации instagram", code)

    res.status(200).end();
}
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
        // User does not exist, create a new user with email only
        user = await User.create({ email, username: undefined, password: undefined });
        return res.status(200).json({ message: 'User created successfully' });
      } else {
        // User already exists
        return res.status(200).json({ message: 'User already exists' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while verifying the code' });
    }
  };
  
  const createUsernamePassword = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      let user = await User.findOne({ where: { email: req.user.email } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the username and password fields
      user.username = username;
      user.password = password;
      await user.save();
  
      res.status(200).json({ message: 'Username and password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the username and password' });
    }
  };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Generate a token for the user
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);
  
    // Return the token to the client
    res.status(200).json({ token });
  };

module.exports = {
    sendVerificationEmail,
    verifyCode,
    createUsernamePassword,
    loginUser
}