require('dotenv').config()
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('checking DB for username sent in jwt_payload');
  console.log(jwt_payload)

  Admin.findOne({ username: jwt_payload.username }, (err, user) => {
    if (err) {
      console.log('--there was an error--');
      return done(err);
    }
    if (!user) {
      console.log('--incorrect username--');
      return done(null, false);
    }
    return done(null, user)
  });
});
