const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/User');

// @route GET api/users/test
// @description Tests users route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    msg: "User works"
  });
});

// @route POST api/users/register
// @description Register user
// @access Public
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg',  // Rating
        d: 'mm'   // Default
      });

      // create new User resource
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar, // es6 short-cut for: "avatar: avatar"
        password: req.body.password
      });

      // encrypt user password and save user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          // save user
          newUser.save().then((user) => {
            // return response with user info
            res.json(user);
          }).catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @description Authenticate user / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email
  User.findOne({
    email: req.body.email
  }).then((user) => {
    // Check for user
    if (!user) {
      res.status(404).json({
        email: 'User not found'
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res.json({
          msg: 'Success'
        });
      } else {
        res.status(400).json({
          password: 'Password incorrect'
        });
      }
    });
  });
});

module.exports = router;
