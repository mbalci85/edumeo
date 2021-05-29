const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');

const usersControllers = require('../controllers/user.controllers');

router.get('/users', usersControllers.getAllUsers);
router.get('/users/:userid', usersControllers.getUserById);
router.post('/users/signup', usersControllers.createUser);
router.post('/users/signin', usersControllers.signIn);
router.put('/users/:userid', isAdmin, usersControllers.updateUser);
router.delete('/users/:userid', isAdmin, usersControllers.removeUser);

module.exports = router;
