require('dotenv').config()
var Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const passport = require('passport');
//require('../config/jwt');
const bcrypt = require("bcryptjs");

// Display list of all Posts.
exports.blog_list = (req, res, next) => {
  res.send('NOT IMPLEMENTED: display list of all blogs');
};

exports.login_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: login get');
}

exports.login_post = (req, res, next) => {
  let { username, password } = req.body;
  //check if username is in DB
  Admin.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('--there was an error--');
      return res.status(401).json({ message: "there was an error" })
    }
    if (!user) {
      console.log('--incorrect username--');
      return res.status(401).json({ message: "incorrect username" })
    }
    //check if password in DB matches
    bcrypt.compare(password, user.password, (err, response) => {
      if (password === user.password) {
        //passwords match, create token and send to client
        console.log('--passwords match!--');
        const secret = process.env.SECRET;
        const expire = process.env.JWT_EXPIRES_IN
        const token = jwt.sign({ username }, secret, { expiresIn: expire });
        return res.status(200).json({
          message: "Auth Passed",
          token
        })
      } else {
        // passwords do not match!
        console.log('--passwords do not match!--');
        return res.status(401).json({ message: "passwords do not match!" })
      }
    });
  });
}

exports.blog_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: show a single blog');
}

// protected route
exports.blog_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: you made it! create a blog GET');

}

exports.blog_create_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: create a blog POST');
}

exports.blog_edit_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: edit a blog GET');
}

exports.blog_edit_put = (req, res, next) => {
  res.send('NOT IMPLEMENTED: edit a blog PUT');
}

exports.blog_delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete blog GET');
}

exports.blog_delete_delete = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete blog DELETE');
}

exports.comment_delete = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete comment');
}
