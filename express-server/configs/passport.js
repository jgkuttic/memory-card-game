
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('./config');
const controller = require('../controllers/users');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  //opts.issuer = 'citrix.com';
  //opts.audience = 'citrite.net';
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    controller.getUserById(jwt_payload._id, (err, user) => {
        if(err){ 
          return done(err, false); 
        }
        else if(user){
          return done(null, user);
        }
        else {
          return done(null, false);
        }
    });
  }));
}