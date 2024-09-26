import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import registerRoute from "./Routes/registerRoute.js"
import userRouter from "./Routes/userRoute.js"

dotenv.config()

const app = express()

const startServerAndConnectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connected successfully")
        app.listen(process.env.PORT, () => {
            console.log(`server is running at http://localhost:${process.env.PORT}`);
        })

    }catch(err){
        console.log(err)
    }
}

app.use(express.json())
app.use(cors())

app.use("/register", registerRoute)
app.use("/users", userRouter)

startServerAndConnectDb()