const blog = require("../blog");
const request = require("supertest");
const express = require("express");
const app = require('../../app');

app.use(express.urlencoded({ extended: false }));
app.use("/blog", blog);

describe('GET /blog', () => {

  test("blog returns 'results' as json and 200 status code", done => {
    request(app)
      .get("/blog")
      .expect("Content-Type", /json/)
      // .expect(200, done)
      .expect(200)
      .then(response => {
        expect(response.body.results).toBeDefined()
        done();
    })
    .catch(err => done(err))
  });

})

describe('GET /blog/id', () => {

})

describe('POST /blog/id', () => {

})