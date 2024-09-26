import {Router} from "express"

import User from "../Models/userModel.js"

const router = Router()


router.get("/:username", async (req, res) => {
    const {username} = req.params
    const userData = await User.findOne({username:username})
    if(userData === null){
        res.status(400).json({msg:"user not found"})
    }else{
        res.status(200).json({msg:"user available", userinfo: userData})
    }
})

export default router