const express = require('express');
const router = express.Router();

const CommentsControllers = require('../controllers/comment.controllers');

router.get('/comments', CommentsControllers.getAll);
router.get('/comments/:postid', CommentsControllers.getCommentByPostId);
router.post('/comments', CommentsControllers.create);

module.exports = router;
