const express = require('express');
const router = express.Router();

const postsControllers = require('../controllers/post.controllers');

router.get('/posts', postsControllers.getAllPosts);
router.post('/posts', postsControllers.createPost);

module.exports = router;
