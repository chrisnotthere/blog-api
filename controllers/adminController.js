require('dotenv').config()
const Admin = require("../models/admin");
const Post = require('../models/post');
const jwt = require("jsonwebtoken");
const passport = require('passport');
const bcrypt = require("bcryptjs");

// display list of all blogs/posts
exports.blog_list = (req, res, next) => {
  Post.find()
    .sort([["date", "ascending"]])
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      //Successful, so send data
      res.json({ results })
    });
};

exports.login_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: login get');
}

// check login credentials, create and send a JWT if match found in DB
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

// display one blog/post by id
exports.blog_get = (req, res, next) => {
  Post.findById(req.params.id)
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      if (result.title == null) {
        // No results.
        const err = new Error("Blog not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so send data.
      res.json({ result })
    });
}

exports.blog_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: create a blog GET (restricted route)');
}

// CREATE a new blog/post
exports.blog_create_post = (req, res, next) => {
  var newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id,
    img: req.body.img,
  })
  // create new post
  Post.create(
    newPost,
    function (err) {
      if (err) {
        return next(err);
      }
      // Successful!
      console.log('new post created!');
      res.json({ newPost });
    }
  );
}

exports.blog_edit_get = (req, res, next) => {
  //return the blog
  Post.findById(req.params.id)
  .exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (result.title == null) {
      // No results.
      const err = new Error("Blog not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so send data.
    res.json({ result })
  });
}

// EDIT (PUT) blog
exports.blog_edit_put = (req, res, next) => {
  //create new blog/post object
  var newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id,
    img: req.body.img,
    _id: req.params.id
  })
  // find the blog by id and replace with newPost object
  Post.findByIdAndUpdate(
    req.params.id,
    newPost,
    {},
    function (err) {
      if (err) {
        return next(err);
      }
      // Successful - redirect to product detail page.
      console.log('post has been updated!');
      res.json({ newPost });
    }
  );
}

exports.blog_delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete blog GET');
}

// DELETE a blog
exports.blog_delete_delete = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete blog DELETE');
}

// DELETE a comment
exports.comment_delete = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete comment');
}
