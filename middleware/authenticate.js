const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../models/User');
var jwt = require('jsonwebtoken');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, opts.secretOrKey, { expiresIn: 3600 });
};

var opts = { secretOrKey: '1234-5678-8765-4321' };
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '124-5678-8765-4321';

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.id }, (err, user, info) => {
      if (err) {
        return done(err, false, { message: info.message });
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: info.message });
      }
    });
  })
);

exports.verifyUser = passport.authenticate(
  'jwt',
  { session: false },
  (err, user, info) => {
    return done(null, false, { message: info.message });
  }
);
