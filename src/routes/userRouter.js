const express = require('express');
const checkLogInToken = require('../utils/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/', userController.getUserById);
router.patch('/edit', userController.editUserInfo);
router.patch('/image', userController.uploadImageUrl);
router.get('/:userId', userController.getOtherUser);

module.exports = { router };
