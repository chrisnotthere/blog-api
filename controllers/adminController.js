//var async = require("async");
var Post = require("../models/post");

//const { body, validationResult } = require("express-validator");

// Display list of all Posts.
exports.blog_list = (req, res, next) => {
  res.send('NOT IMPLEMENTED: display list of all blogs');
};

exports.blog_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: show a single blog');
}

exports.blog_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: create a blog GET');
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
