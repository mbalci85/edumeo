const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/user.controllers');

router.get('/users', usersControllers.getAllUsers);
router.get('/users/:id', usersControllers.getUserById);
router.post('/users', usersControllers.createUser);

module.exports = router;
