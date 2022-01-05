const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AdminSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
