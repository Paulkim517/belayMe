// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define post schema
var PostSchema = new Schema({
  userName: String,
  location: String,
  message: String
});

// create and export Log model
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;