"use strict"

const {mongoose}=require("../configs/dbConnection")
const {isEmail} = require("validator")
const passwordEncrypt=require("../helpers/passwordEncrypt")

/*sample 
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin",
    "isActive": true,
    "isAdmin": true
},
{
    "username": "test1",
    "password": "aA*123456",
    "email": "test1@site.com",
    "firstName": "test1",
    "lastName": "test1",
    "isActive": true,
    "isAdmin": false
}
*/

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

    },isActive: {
        type: Boolean,
        default: true
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


module.exports=mongoose.model("User",UserSchema)