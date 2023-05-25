const express = require("express");

const userRouter = require("./userRouter");
const followerRouter = require("./followerRouter");
const feedRouter = require("./feedRouter");
const likeRouter = require("./likeRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/follower", followerRouter.router);
router.use("/feeds", feedRouter.router);
router.use("/like", likeRouter.router);

module.exports = router;
