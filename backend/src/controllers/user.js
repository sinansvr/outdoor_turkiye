"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt=require("../helpers/passwordEncrypt")

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  // register
  create: async (req, res) => {

    //disallow to be admin
    req.body.isAdmin = false

    //create new user
    const data = await User.create(req.body);

    //create token
    const userId=data._id;
    const tokenData = await Token.create({userId: userId, token: passwordEncrypt(userId + Date.now()),
    });


    res.status(201).send({
      error: false,
      data,
      token:tokenData.token
    });
  },

  read: async (req, res) => {

    //only self data
    let filters={}
    if(!req.user?.isAdmin) filters={_id : req.user._id}

    const data = await User.findOne({ _id: req.params.id, ...filters });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    
    //only self data
    let filters={}
    if(req.user.isAdmin){
      filters={_id: req.user._id}

      //disallow to be admin
      req.body.isAdmin=false;
    }    

    const data = await User.updateOne({ _id: req.params.id, ...filters }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
