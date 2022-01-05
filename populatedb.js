#! /usr/bin/env node

console.log(
  "This script populates test data. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var Post = require("./models/post");
var Admin = require("./models/admin");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var admins = [];
var posts = [];

function adminCreate(firstname, lastname, username, email, password, cb) {
  admindetail = { firstname, lastname, username, email, password };

  var admin = new Admin(admindetail);

  admin.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New admin: " + admin);
    admins.push(admin);
    cb(null, admin);
  });
}

function postCreate(title, date, content, author, published, image, comments, cb) {
  postdetail = { title, date, content, author, published, image, comments };

  var post = new Post(postdetail);
  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New post: " + post);
    posts.push(post);
    cb(null, post);
  });
}

///firstname, lastname, username, email, password
function createadmins(cb) {
  async.series(
    [
      function (callback) {
        adminCreate(
          "Billy",
          "Bob",
          "billyBobby27",
          "bob@company.com",
          "mypassword",
          callback
        );
      },
      function (callback) {
        adminCreate(
          "Mary",
          "Jane-smith",
          "maryJSblogger",
          "mjs@yahoo.com",
          "123456",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

//title, date, content, author, published, image, [comments]
function createposts(cb) {
  async.parallel(
    [
      function (callback) {
        postCreate(
          "My first blog!",
          1641421215076,
          "Blah blah blah blah blah blah.Eggs have a hard shell of calcium carbonate enclosing a liquid white, a single yolk (or an occasional double yolk)and an air cell.",
          admins[0],
          true,
          "blog01.jpg",
          [],
          callback
        );
      },
      function (callback) {
        postCreate(
          "The joys of asparagus.",
          1641121503433,
          "Asparagus, or garden asparagus, folk name sparrow grass, scientific name Asparagus officinalis, is a perennial flowering plant species in the genus Asparagus. Its young shoots are used as a spring vegetable. It was once classified in the lily family, like the related Allium species, onions and garlic.",
          admins[1],
          true,
          "asparagusPic.png",
          [],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}


async.series(
  [createadmins, createposts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("posts: " + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
