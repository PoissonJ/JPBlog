// blogPost model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPost = new Schema({
  title: String,
  preview: String,
  date: Date,
  body: String,
  author: String
}, {collection: 'blogPosts'});

module.exports = mongoose.model('blogPosts', BlogPost);
