var Post = require("../models/post");

// Display list of all Posts.
exports.blog_list = (req, res, next) => {

  Post.find()
    .sort([["date", "descending"]])
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      //Successful, so send data
      res.status(200).json({ results })
    });
};

// Display one blog by id
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
};

// Create a comment
exports.comment_post = (req, res, next) => {
  //find the blog
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
        // Successful - send updated blog as response
        res.json({ result })
      }
    );
  });
};
