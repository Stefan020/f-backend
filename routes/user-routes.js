const express = require('express');
const auth = require( '../controllers/user-controller');

const userRouter = express.Router();

// userRouter.get("/", auth.getUser)
userRouter.post("/register", auth.create)
userRouter.post("/login", auth.login)

module.exports = userRouter;
