const blog = require("../blog");
const request = require("supertest");
const express = require("express");
//const app = require('../../app');
const mongoose = require("mongoose");

const initializeMongoServer = require('../../config/mongoConfigTesting');
const app = express();
initializeMongoServer();

var Post = require("../../models/post");

app.use(express.urlencoded({ extended: false }));
app.use("/blog", blog);

const myId = mongoose.Types.ObjectId();

beforeAll(() => {

  const postDetail = {
    "title": "New Blog Title",
    "date": 1641421215076,
    "content": "lorem ipsum 123345678910...",
    "author": "61dc82433f1943a7eb665fa9",
    "published": true,
    "img": "image.png",
    "comments": [],
    "_id": myId,
  }
  var post = new Post(postDetail);
  post.save();
  // const id = post._id
})

describe('GET /blog', () => {

  test("blog returns all 'results' as json and 200 status code", done => { //*** split this up into more than one test ***
    request(app)
      .get("/blog")
      .expect("Content-Type", /json/)
      // .expect(200, done)
      .expect(200)
      .then(response => {
        expect(response.body.results).toBeDefined()
        expect(response.body.results[0].title).toBe('New Blog Title')
        done();
      })
      .catch(err => done(err))
  });

})

describe('GET /blog/id', () => {

  test("returns correct blog ", done => {
    request(app)
      .get(`/blog/${myId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined()
        expect(response.body.result.title).toBe('New Blog Title')
        done();
      })
      .catch(err => done(err))
  })
})

describe('POST /blog/id', () => {

  test('user can create a comment', done => {
    request(app)
      .post(`/blog/${myId}`)
      .expect(200, done)
      // //something like this...
      // .type("form")
      // .send({ item: "hey" })
      // .then(() => {
      //   request(app)
      //     .get("/test")
      //     .expect({ array: ["hey"] }, done);
      // })

  })
})
