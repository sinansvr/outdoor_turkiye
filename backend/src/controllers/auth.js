"use strict";

const Token = require("../models/token");
const User = require("../models/user");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {

  login: async (req, res) => {

    const { username, email, password } = req.body;

    //username/email and password entered?
    if ((username || email) && password) {

      const userData = await User.findOne({ $or: [{ username }, { email }] });

      // is password coorect? 
      if (userData && userData.password == passwordEncrypt(password)) {
        
        //is user active?
        if (userData.isActive) {

          let userId = userData._id.toString();
          
          //check database for token
          let tokenData = await Token.findOne({ userId: userId });
         
          // if token does not exist; create
          if (!tokenData) {
            tokenData = await Token.create({
              userId: userId,
              token: passwordEncrypt(userId + Date.now()),
            });
          }

          // send token and user infos
          res.send({
            token: tokenData.token,
            user: userData,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This user is not active!");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password!");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password!");
    }
  },

  logout: async (req,res) => {

    
    const auth = req?.headers?.authorization || null

    const  token = auth ? auth.split(' ')[1] : null


    if(token) await Token.deleteOne({token})
      
      res.send({
      error:false,
      message: 'User loged out'
    })

  }
};
