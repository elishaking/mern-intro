const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const { validatePostInput } = require('../../validation/post');

// @route GET api/posts/test
// @description Tests post route
// @access Public
router.get('/test', (req, res) => {
  res.json({
    msg: "Posts works"
  });
});

// @route GET api/posts
// @description Get all posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      data: -1
    })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({
      nopostsfound: "No posts found"
    }));
});

// @route GET api/posts/:id
// @description Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) return res.status(404).json({
        nopostfound: "No post found with that ID"
      });

      res.json(post);
    })
    .catch((err) => res.status(404).json({
      nopostfound: "No post found with that ID"
    }));
});

// @route POST api/posts
// @description Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then((post) => res.json(post));
});

// @route DELETE api/posts/:id
// @description Delete post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id).then((post) => {
      // Check for post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }

      // Delete post
      post.remove().then(() => res.json({
        success: true
      }));
    }).catch((err) => res.status(404).json({
      postnotfound: 'Post not found'
    }));
  });
});

// @route POST api/posts/like/:post_id
// @description Like post
// @access Private
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.post_id).then((post) => {
      // Check if user has already liked post
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({
          alreadyliked: "User already liked this post"
        });
      }

      // Add user id to likes array
      post.likes.unshift({ user: req.user.id });
      post.save().then((post) => res.json(post));
    }).catch((err) => res.status(404).json({
      postnotfound: 'Post not found'
    }));
  });
});

// @route POST api/posts/unlike/:post_id
// @description Unlike post
// @access Private
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.post_id).then((post) => {
      // Check if user has already liked post
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({
          notliked: "User has not liked this post"
        });
      }

      // Get remove index for like
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      // remove like from likes array using removeIndex
      post.likes.splice(removeIndex, 1);
      post.save().then((post) => res.json(post));
    }).catch((err) => res.status(404).json({
      postnotfound: 'Post not found'
    }));
  });
});

module.exports = router;
