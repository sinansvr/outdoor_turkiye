"use strict"

module.exports={
    isLogin:(req,res,next)=>{

        if(process.env.NODE_ENV=="develpoment") return next()

        if(req?.user && req?.user.isActive){
            next()
        } else{
            res.errorSatatusCode=403;
            throw new Error("No Permission!, You must login!")
        }
    },

    isAdmin:(req,res,next)=>{
        if(process.env.NODE_ENV=="development") return next()

        if(req?.user && req?.user.isAdmin){
            next()
        }else{
            res.errorSatatusCode=403;
            throw new Error("No Permission! You must login an to be Admin!")
        }

    }
}