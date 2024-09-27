import { Router } from "express";

import User from "../Models/userModel.js";

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

router.post("/update-profilo/:id", async (req, res) => {
  const { id } = req.params;
  const userData = await User.updateOne(
    { _id: id },
    {...req.body}
  );
  res.json({msg:"ok"});
});

export default router;
