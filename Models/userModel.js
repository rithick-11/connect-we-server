import mongoose from "mongoose";
import validator from 'validator';

const userShema = mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exist"],
    },
    name:String,
    avatorUrl:String,
    gender:String,
    email:{
        type:String,
        unique:[true, "email already exist"],
        validate : [validator.isEmail, "invalide e-mail"]
    },
    socialLink:[
        {
            paltform:String,
            url:String
        }
    ],
    password:String,
    createdAt:Date
})

const User = mongoose.model("user", userShema)

export default User