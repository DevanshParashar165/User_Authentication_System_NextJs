import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please provide a username"],
        unique : true
    },
    email : {
        type : String,
        required : [true,"Please provide a email"],
        unique : true
    },
    password : {
        type : String,
        required : [true,"Please provide a password"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : {
        type : String
    },
    forgotPasswordTokenExpiry : {
        type : Date
    },
    verifyToken : {
        type : String
    },
    verifyTokenExpiry : {
        type : String
    }
})

jwt.sign({

})

export const User = mongoose.models.users ||  mongoose.model("user",userSchema)