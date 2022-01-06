require('dotenv').config()
//var async = require("async");
//var Post = require("../models/post");
const jwt = require("jsonwebtoken");

//const { body, validationResult } = require("express-validator");

// Display list of all Posts.
exports.blog_list = (req, res, next) => {
  res.send('NOT IMPLEMENTED: display list of all blogs');
};

exports.login_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: login get');
}

exports.login_post = (req, res, next) => {
  //res.send('NOT IMPLEMENTED: login post');

  let { username, password } = req.body;
  //This lookup would normally be done using a database
  if (username === "admin") {
    if (password === "pass") { //the password compare would normally be done using bcrypt.
      const secret = process.env.SECRET;
      const expire = process.env.JWT_EXPIRES_IN
      const token = jwt.sign({ username }, secret, { expiresIn: expire });
      return res.status(200).json({
        message: "Auth Passed",
        token
      })
    }
  }
  return res.status(401).json({ message: "Auth Failed" })

}

exports.blog_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: show a single blog');
}

exports.blog_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: you made it! create a blog GET');

  //make this a protected route with passportJWT...

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
