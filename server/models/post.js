// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const postSchema = new mongoose.Schema({
  post: {type:String, required:true},
  posttype: { type: String,},
  userid: { type: String },
  comment: [{
    commentdate: {type: Date, default: Date.now},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
})


const Post = mongoose.model("Post", postSchema);


async function create(post, posttype, userid) {
  const newPost = await Post.create({
    post: post,
    posttype: posttype,
    userid: userid
  });

  return newPost;
}


async function updatePost(postid, post, posttype) {
  const postNew = await Post.updateOne({"_id": postid}, {$set: { post:post, posttype: posttype}});
  return postNew;
}


async function deletePost(postid) {
  console.log("This is Im going to delete", postid);
  await Post.deleteOne({"_id": postid});
  console.log("This is I have deleted", postid);
};


async function getUserPosts(userid) {
    return await Post.find({ "userid": userid});
}


module.exports = { 
    create, updatePost, deletePost, getUserPosts
};