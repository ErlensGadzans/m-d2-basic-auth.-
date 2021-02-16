const express = require("express");
const UserModel = require("./schema");
const { adminOnly, basic } = require("../auth");

const usersRouter = express.Router();

usersRouter.get("/", basic, adminOnly, async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/me", basic, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.delete("/me", basic, async (req, res, next) => {
  try {
    await req.user.deleOne();
    res.status(204).send("User is deleted.");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
