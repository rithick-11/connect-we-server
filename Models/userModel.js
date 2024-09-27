import mongoose from "mongoose";
import validator from 'validator';

const userShema = mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exist"],
    },
    name:{
        type:String,
        default:"gust user"
    },
    bio:{
        type:String,
        default:"all is well"
    },
    profession:{
        type:String,
        default:"none"
    },
    avatorUrl:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/266/266033.png"
    },
    gender:{
        type:String,
        default: "mele"
    },
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