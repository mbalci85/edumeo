const express = require('express');
const router = express.Router();

const CommentsControllers = require('../controllers/comment.controllers');

router.get('/comments', CommentsControllers.getAll);

module.exports = router;
