const express = require('express');

const userRouter = require('./userRouter');
const followerRouter = require('./followerRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/follower', followerRouter.router);

module.exports = router;
