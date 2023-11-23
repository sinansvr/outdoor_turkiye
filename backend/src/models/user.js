"use strict"

const {mongoose}=require("../configs/dbConnection")
const {isEmail} = require("validator")
const {passwordEncrypt}=require("../helpers/passwordEncrypt")

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        validate: [isEmail, "Email type is not correct"]
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{collection:"users",timestamps:true})

UserSchema.pre(['save', 'updateOne'], function (next) {

    const data = this?._update || this

    if (data?.password) {
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+.,])[A-Za-z\d@$!%*?&+.,].{8,}$/.test(data?.password)

        if (isPasswordValidated) {
            this.password = data.password = passwordEncrypt(data.password)
        } else {
            next(new Error("Password not validated."))
        }

        next()
    }
})
UserSchema.pre('init', function (data) {
    data.id = data._id
})

module.exports=mongoose.model("User",UserSchema)