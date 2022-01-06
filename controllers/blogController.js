//var async = require("async");
var Post = require("../models/post");

//const { body, validationResult } = require("express-validator");

// Display list of all Posts.
exports.blog_list = (req, res, next) => {

  Post.find()
    .sort([["date", "ascending"]])
    .exec(function (err, results) {
      if (err) {
        console.log('there was an error');
        return next(err);
      }
      //Successful, so send data
      console.log('success');
      res.json({ results })

    });
};

exports.blog_get = (req, res, next) => {

  Post.findById(req.params.id)
    .exec(function (err, results) {
      if (err) {
        console.log('there was an error');
        return next(err);
      }
      if (results.title == null) {
        // No results.
        console.log('no blog found');
        const err = new Error("Blog not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so send data.
      console.log('success');
      res.json({ results })
    });
};

exports.comment_post = (req, res, next) => {
  // find the blog then add new comment to comments array
  //find the blog
  Post.findById(req.params.id)
  .exec(function (err, result) {
    if (err) {
      console.log('there was an error');
      return next(err);
    }
    if (result.title == null) {
      // No results.
      console.log('no blog found');
      const err = new Error("Blog not found");
      err.status = 404;
      return next(err);
    }
    // blog was found, now add comment to comments array

    // Create a comment object with data from user.
    const comment = {
      username: req.body.username,
      content: req.body.content,
      date: Date.now(),
    };
    // push comment onto blog's comment array
    result.comments.push(comment);

    // save
    Post.findByIdAndUpdate(
      req.params.id,
      result,
      {},
      function (err, thepost) {
        if (err) {
          return next(err);
        }
        // Successful - send updated blog
        console.log('success');
        res.json({ result })
      }
    );
  });
};
