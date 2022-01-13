const blog = require("../blog");
const request = require("supertest");
const express = require("express");
//const app = require('../../app');

const initializeMongoServer = require('../../config/mongoConfigTesting');
const app = express();
initializeMongoServer();

var Post = require("../../models/post");

app.use(express.urlencoded({ extended: false }));
app.use("/blog", blog);

describe('GET /blog', () => {

  beforeAll(() => {

    const postDetail = {
      "title" :"New Blog Title",
      "date" : 1641421215076,
      "content" : "lorem ipsum 123345678910...",
      "author" : "61dc82433f1943a7eb665fa9",
      "published" : true,
      "img" : "image.png",
      "comments" : [],
    }
    var post = new Post(postDetail);
    post.save();

  })

  test("blog returns 'results' as json and 200 status code", done => {
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

})

describe('POST /blog/id', () => {

})