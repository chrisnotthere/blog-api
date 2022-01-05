const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment (sub-document) must be defined before being assigned to parent Post
// defining comments within the post schema should mean that when a post is deleted all comments are also deleted
const Comment = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { default: Date.now(), type: Date },
});

Comment.virtual("date_formated").get(function () {
  return this.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  });
});

const PostSchema = new Schema({
  title: { type: String, required: true },
  date: { default: Date.now(), type: Date },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  published: { default: true, type: Boolean },
  img: { default: "blogpic.png", type: String },
  //comments: { default: [], type: Array },
  comments: {
    type: [Comment]
  },
});

PostSchema.virtual("date_formated").get(function () {
  return this.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });
});

module.exports = mongoose.model("Post", PostSchema);
