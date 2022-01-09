// Import environmental variables
require('dotenv').config()
// import express, jwt and bcrypt
const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// import User schema
let User = require('../models/user.models');
/*
    GET request: Return list of users

    Parameters: None
    Return: list of user objects
*/
router.route('/').get((req, res) => {
  // find users
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
    POST request: Register user

    Parameters: JSON containing username(String) and password
    Return: saved User object 
    Output: "User added!" if successful, error if fail
*/
router.route('/register').post(async (req, res) => {
  try {
    // password encryption for security
    const hashedPassword = await bcrypt.hash(req.body.password, 1)

    // create user 
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword
    })

    // register user
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch {
    res.status(500).send()
  }
});

/*
    POST request: Login user

    Parameters: JSON containing username(String) and password(STring)
                Authorization: Bearer TOKEN
    Return: json web token
    Output: token if successful, "Cannot find user" if user not in database, "Not allowed" if incorrect password
*/
router.route('/login').post((req, res) => {
  // obtain credentials
  const {
    username,
    password
  } = req.body;

  User.findOne({
    username
  }).then(user => {
    // user not found
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }

    //user found

    try {
      // check if password matches
      bcrypt.compare(password, user.password).then(isMatched => {
        // doesnt match
        if (!isMatched) {
          return res.send('Not Allowed')
        }

        // password matched

        // configure payload
        const payload = {
          name: username
        }

        // sign and return jsonwebtoken
        // don't set an expiry date, since we are not refreshing token in this implementation
        jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET,
          (err, token) => {
            return res.json({
              token: 'Bearer ' + token
            });
          }
        );
      });
    } catch {
      res.status(500).send()
    }
  });
});

module.exports = router;