import { Router } from "express";

import User from "../Models/userModel.js";

const router = Router()

router.get("/check", async (req, res) => {
    const {username} = req.query
    const userData = await User.findOne({username: username})
    res.json({status: userData === null})
})

export default router