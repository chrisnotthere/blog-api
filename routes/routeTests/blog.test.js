const blog = require("../blog");
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

// use mongodb-memory-server for testing so we dont compromise producation database
const initializeMongoServer = require('../../config/mongoConfigTesting');
const app = express();
initializeMongoServer();

var Post = require("../../models/post");

app.use(express.urlencoded({ extended: false }));
app.use("/blog", blog);

const fakeId1 = mongoose.Types.ObjectId();
const fakeId2 = mongoose.Types.ObjectId();

// insert some sample data into mongodb-memory-server so we can test it
beforeAll(() => {
  const postDetail1 = {
    "title": "New Blog Title",
    "date": 1641421215076,
    "content": "lorem ipsum 123345678910...",
    "author": "61dc82433f1943a7eb665fa9",
    "published": false,
    "img": "image.png",
    "comments": [],
    "_id": fakeId1,
  }
  var post1 = new Post(postDetail1);
  post1.save();

  const postDetail2 = {
    "title": "Asparagus Recipe",
    "date": 1641421215499,
    "content": "One of the quickest and easiest ways to prepare fresh asparagus is to simply blanch them for a couple of minutes and toss them with some freshly grated parmesan cheese, olive oil, and lemon zest.",
    "author": "61dc82433f1943a7eb665fa9",
    "published": true,
    "img": "someimage.png",
    "comments": [
      {
        "username": "bobby",
        "content": "interesting read!",
      },
      {
        "username": "user",
        "content": "this is a comment",
      },
    ],
    "_id": fakeId2,
  }
  var post2 = new Post(postDetail2);
  post2.save();
})

describe('GET /blog', () => {
  test("/blog returns json and 200 status code", done => {
    request(app)
      .get("/blog")
      .expect("Content-Type", /json/)
      .expect(200, done)
  });

  test('/blog returns correct data', done => {
    request(app)
      .get("/blog")
      .then(response => {
        expect(response.body.results).toBeDefined()
        expect(response.body.results[0].title).toBe('New Blog Title')
        expect(response.body.results[0].content).toBe('lorem ipsum 123345678910...')
        expect(response.body.results[1].title).toBe('Asparagus Recipe')
        expect(response.body.results[1].comments).toHaveLength(2)
        expect(response.body.results[1].comments[0].content).toBe('interesting read!')
        done();
      })
      .catch(err => done(err))
  })
})

describe('GET /blog/id', () => {
  test("/blog/id returns json and 200 status code ", done => { 
    request(app)
      .get(`/blog/${fakeId1}`)
      .expect("Content-Type", /json/)
      .expect(200, done)
  })

  test('/blog/id returns correct data (Example 1)', done => {
    request(app)
      .get(`/blog/${fakeId1}`)
      .then(response => {
        expect(response.body.result).toBeDefined()
        expect(response.body.result.title).toBe('New Blog Title')
        done();
      })
      .catch(err => done(err))
  })

  test('/blog/id returns correct data (Example 2)', done => {
    request(app)
      .get(`/blog/${fakeId2}`)
      .then(response => {
        expect(response.body.result).toBeDefined()
        expect(response.body.result.title).toBe('Asparagus Recipe')
        expect(response.body.result.img).toBe('someimage.png')
        expect(response.body.result.comments).toHaveLength(2)
        done();
      })
      .catch(err => done(err))
  })
})

describe('POST /blog/id', () => {
  const testComment = {
    username: "someInternetStranger",
    content: "some comment",
  }

  test('POST sends a comment which can be seen with a GET /blog/id request', done => {
    request(app)
      .post(`/blog/${fakeId1}`)
      .type("form")
      .send(testComment)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        request(app)
          .get(`/blog/${fakeId1}`)
          .then(response => {
            expect(response.body.result.comments).toHaveLength(1)
            expect(response.body.result.comments[0].username).toBe('someInternetStranger')
            expect(response.body.result.comments[0].content).toBe('some comment')
            done();
          })
          .catch(err => done(err))
      })
  })
})
