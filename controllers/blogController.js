//var async = require("async");
var Post = require("../models/post");

//const { body, validationResult } = require("express-validator");

// Display list of all Posts.
exports.blog_list = (req, res, next) => {

  res.send('NOT IMPLEMENTED: display list of all blogs');

  // Post.find()
  //   .sort([["date", "ascending"]])
  //   .exec(function (err, posts_list) {
  //     if (err) {
  //       console.log('there was an error');
  //       return next(err);
  //     }
  //     //Successful, so send data
  //     console.log('success');
  //     res.json({ posts_list })

  //   });
};

exports.blog_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: show a single blog');
}

exports.comment_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: create a comment');
}
