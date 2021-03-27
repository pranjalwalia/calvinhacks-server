const express = require('express');
const passport = require('passport');
const authenticate = require('./../middleware/authenticate');
const router = express.Router();
const User = require('./../models/User');

router.post('/signup', (req, res) => {
  User.register(
    new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.email,
      email: req.body.email
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      }
    }
  );
});

router.post('/login', (req, res) => {
  passport.authenticate('local', function (err, user, info) {
    if (!user) {
      return res.json({ err: info.message });
    }
    const token = authenticate.getToken({ id: user.id });
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    return res.json({
      success: true,
      token: token,
      status: 'Login successful'
    });
  })(req, res);
});

module.exports = router;
