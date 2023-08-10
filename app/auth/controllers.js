const sendEmail = require('../utils/sendMail')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthCode = require('./AuthCode')
const User = require('./User')

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
  try {
    const { email, code } = req.body;
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
    const token = jwt.sign({ id: user.id, email: user.email }, 'mySecret', { expiresIn: 24 * 60 * 60 * 365 });
    res.status(200).send(token)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while verifying the code' });
  }
};

const createUsernamePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if(!user) return res.status(400).send({message: "User not found"})
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, 10);
    if(
      !req.body.username
      || req.body.username.length === 0
      || !req.body.password
      || req.body.password.length === 0
      ) return res.status(400).json({ message: 'Username and password must be filled' })
    else{
      await user.update({
        username: req.body.username,
        password: hashedPassword
      })
    }
    res.status(200).json({ message: 'Username and password updated successfully' });
  } catch (error) {
    res.status(500).send(error)
  }
};

const loginUser = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send(error)
  }
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