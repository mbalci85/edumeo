const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/user.controllers');

router.get('/users', usersControllers.getAllUsers);

module.exports = router;
