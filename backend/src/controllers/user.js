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

    //create new user
    const data = await User.create(req.body);

    //create token
    const userId=data._id;
    const tokenData = await Token.create({userId: userId, token: passwordEncrypt(userId + Date.now()),
    });


    res.status(201).send({
      error: false,
      data,
      tokenData
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.id }, req.body, {
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
