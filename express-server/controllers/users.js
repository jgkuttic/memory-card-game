
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../configs/config');
const saltRounds = 15;


module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if(err){
            console.error(err.message); 
        }
        if((newUser.firstName === 'Joe' && newUser.lastName === 'Kuttickal') 
        && (newUser.username === 'jgkuttic' || newUser.username === 'jkuttick')){
            newUser.role = 'Admin';
        }
        newUser.password = hash;
        newUser.save(callback);
    });
};

module.exports.comparePassword = function(userPassword, hash, callback) {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        if(err){ throw err; }
        callback(null, isMatch);
    });
}

module.exports.deleteUser = function(id, callback){
    const query = { _id: id };
    User.deleteOne(query, callback);
};

module.exports.updateUser = function(id, user, callback){
    const query = { _id: id };
    User.updateOne(query, user, callback);
};

module.exports.listUsers = function(q, users, callback){
    User.find({}, users, callback);
};

module.exports.isAuthorized = function(user){
  if(user.role === 'Admin' || user.role === 'admin'){
    return true;
  }
  return false;
};