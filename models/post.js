const mongoose = require("mongoose");


const postSchema =new  mongoose.Schema({
    author: {type: String, require: true},
    location: {type: String, require: true},
    description: {type: String, require: true},
    imageFile: {type: String, require: true},
    likes: {type: Number, default: 0},
    date: {type: Date, default: new Date()}
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;