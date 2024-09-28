import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../Models/userModel.js";
import { authoziation } from "../Middlewares/middlewares.js";

const router = Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const userData = await User.findOne(
    { username: username },
    { password: 0, createdAt: 0 }
  );
  if (userData === null) {
    res.status(400).json({ msg: "user not found" });
  } else {
    res.status(200).json({ msg: "user available", userinfo: userData });
  }
});

router.put("/update-profilo", authoziation, async (req, res) => {
  const userData = await User.updateOne(
    { username: req.body.username },
    { ...req.body }
  );
  res.json({ ...userData, msg: "ok" });
});

router.post("/login", async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({ username });
  if (user === null) {
    req.status(401);
  } else {
    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({ username }, "rithick");
      res.status(202).json({ token: token, msg: "ok" });
    } else {
      res.status(402).json({ msg: "worng password" });
    }
  }
});

router.post("/add-social-link", authoziation, async (req, res) => {
  const { newLinkData } = req.body;
  const response = await User.updateOne(
    { username: req.username },
    { $push: { socialLink: newLinkData } }
  );
  res.status(202).json(response);
});

export default router;
