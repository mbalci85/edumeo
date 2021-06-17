const express = require('express');
const router = express.Router();

const postsControllers = require('../controllers/post.controllers');

router.get('/posts', postsControllers.getAllPosts);
router.get('/posts/:postid', postsControllers.getPostById);
router.get('/posts/title/:title', postsControllers.getPostsByTitle);
router.get('/posts/userid/:userid', postsControllers.getPostsByUserId);
router.get('/posts/ispublished/:ispublished', postsControllers.getPublishedPosts);
router.post('/posts', postsControllers.createPost);
router.put('/posts/:postid', postsControllers.updatePost);
router.delete('/posts/:postid', postsControllers.publishPost);
router.delete('/posts/delete/:postid', postsControllers.deletePost);

module.exports = router;
