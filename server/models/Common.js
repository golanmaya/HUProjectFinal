const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
})

const nameSchema = new mongoose.Schema({
  first: String,
  middle: String,
  last: String,
})

module.exports = { imageSchema, nameSchema }