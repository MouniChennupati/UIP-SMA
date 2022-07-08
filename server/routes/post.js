const express = require("express");
const Post = require('../models/post'); 
const router = express.Router();

router
  .post('/create', async (req, res) => {
    try {
      const post = await Post.create(req.body.post,req.body.posttype, req.body.userid);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })
 
  .post('/getUserPosts', async (req, res) => {
    try {
      const posts = await Post.getUserPosts(req.body.userid);
      res.send({...posts});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.postid, req.body.post, req.body.posttype);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.postid);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;

