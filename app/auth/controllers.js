const sendEmail = require('../utils/sendMail')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthCode = require('./AuthCode')
const User = require('./User')
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

    }
    const token = jwt.sign({ id: user.id, email: user.email }, 'фцывфцвапуы', { expiresIn: 24 * 60 * 60 * 365 });
    res.status(200).send(token)

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

  const editUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, email, phone, username} = req.body;

    await User.update(
      {
        full_name: full_name,
        email:  email,
        phone: phone,
        username: username
      },
      {
        where: {
          id: userId,
        },
      }
    );

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user credentials' });
  }
};
module.exports = {
    sendVerificationEmail,
    verifyCode,
    createUsernamePassword,
    loginUser,
    editUser
}