"use strict"

const Token = require("../models/token")
const User = require("../models/user")
const passwordEncrypt=require("../helpers/passwordEncrypt")

module.exports={ 

    login: async(req,res)=>{

        const {username, email, password } = req.body;

        if((username || email) && password ){

            const userData = await User.findOne({$or:[{username},{email}]})

            if(userData && userData.password==passwordEncrypt(password)){

                if(userData.isActive){
                    
                let userId= userData._id;
                 let tokenData = await Token.findOne({userId:userId})
                    console.log(tokenData)

                }else{
                res.errorStatusCode=401;
                throw new Error("This user is not active!")
                }

            }else{
                res.errorStatusCode=401;
                throw new Error("Wrong username/email or password!")
            }           

        }else{
            res.errorStatusCode=401;
            throw new Error("Please enter username/email and password!")
        }


    }
}