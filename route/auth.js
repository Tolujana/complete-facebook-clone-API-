const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//register
router.post('/register', async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
});

//login

router.post('/login', async (req, res) => {
  try {
   
    const userEmail = req.body.email
    const user = await User.findOne({ email: userEmail });
    console.log(user)
    !user && res.status(404).json('user not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('incorrect password');
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
