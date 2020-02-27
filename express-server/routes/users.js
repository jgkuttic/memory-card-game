
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const controller = require('../controllers/users');

//Get all the users
router.get('/users', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!controller.isAuthorized(req.user)){
      return res.json({ success: false, msg: 'User is not authorized!' });
    }
    const q = {};
    controller.listUsers(q, (err, users) => {
      if(err){
        throw err;
      }
      else {
        return res.json(users);
      }
    });
  });

//Register
router.post('/user/register', (req, res, next) => {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
  
    controller.addUser(newUser, (err, user) => {
      if(err){
        console.log(err);
        res.json({ success: false, msg: 'Failed to register user!' });
      }
      else {
        res.json({ success: true, msg: 'User has been registered!' });
      }
    });
  });

  //Authenticate
router.post('/user/authenticate', (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;

    controller.getUserByUsername(username, (err, user) => {
      if(err) { throw err; }
  
      if(!user){
        return res.json({ success: false, msg: 'User not found!' });
      }
      controller.comparePassword(password, user.password, (err, isMatch) => {
        if(err){ throw err; }
        if(isMatch){
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 86400 //1 day
          });
  
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        }
        else {
          return res.json({ success: false, msg: 'Incorrect Password!' });
        }
      });
    });
});

//Profile
router.get('/user/profile', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
    res.json({ user: req.user });
});

//Get user by id
router.get('/user/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //Check if admin
    if(!controller.isAuthorized(req.user)){
      return res.json({ success: false, msg: 'User is not authorized!' });
    }
  
    const id = req.params.id;
    controller.getUserById(id, (err, user) => {
      if(err){
        throw err;
      }
      else{
        return res.json({ 
            success: true, 
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
      }
    });
  });

// Delete a user profile
router.delete('/user/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.params.id;
    controller.deleteUser(id, (err, user) => {
        if(err){
        throw err;
        }
        else {
        return res.json({ success: true, msg: 'User profile has been deleted!' });
        }
    });
});

//Update a user profile
router.put('/user/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const updatedUser = req.body;
    const id = req.params.id;
    controller.updateUser(id, updatedUser, (err, user) => {
      if(err){
        throw err;
      }
      else {
        controller.getUserById(id, (err, user) => {
          if(err) { throw err; }
          return res.json({ success: true, msg: 'User profile has been updated!',
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        });
      }
    });
  });

module.exports = router;