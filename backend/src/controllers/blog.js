"use strict";

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    let filters = { status: "Published" };

    if (req?.query?.author && req.user.username == req?.query?.author) {
      filters = req.query;
    }

    if (req?.query?.author && !(req.user.username == req?.query?.author)) {
      throw new Error("You can only see your own blog");
    }

    const data = await res.getModelList(Blog, filters, "category");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog),
      data,
    });
  },

  create: async (req, res) => {
    //add user id to author
    const data = await Blog.create({ ...req.body, author: req.user._id });

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    let data = await Blog.findOne({ _id: req.params.id });

    // save unique readers ids into visitors and inc views +1
    if (req?.user._id && !data.visitors.includes(req?.user._id)) {
      data.visitors.push(req?.user._id.toString());
      data.views += 1;
      await Blog.updateOne(
        { _id: req?.params.id },
        { $set: { visitors: data.visitors, views: data.views } }
      );
    }

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const theBlog = await Blog.findOne({ _id: req.params.id });

    //only blog owner update
    if (theBlog.author == req?.user._id) {
      const data = await Blog.updateOne({ _id: req?.params.id }, req.body);
    } else {
      throw new Error("You can't change the blog!");
    }

    res.status(202).send({
      error: false,
      data,
      new: await Blog.findOne({ _id: req?.params.id }),
    });
  },

  delete: async (req, res) => {
    const theBlog = await Blog.findOne({ _id: req.params.id });

    console.log(theBlog.author.toString(), req?.user._id.toString());

    // Only the blog owner or admin can delete
    if (
      theBlog.author.toString() == req?.user._id.toString() ||
      req.user.isAdmin
    ) {
      const data = await Blog.deleteOne({ _id: req.params.id });

      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data,
      });
    } else {
      res.status(403).send({
        error: true,
        message: "You can't delete the blog!",
      });
    }
  },

  like: async (req, res) => {
    const data = await Blog.findOne({ _id: req.params.id });

    const islikedBefore = data.likes.includes(req?.user?._id.toString());
    //check likes, add or remove
    if (islikedBefore) {
      data.likes = data.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      data.likes.push(req?.user?._id.toString());
    }

    //update likes
    await data.save();

    //update likes alternative method
    // await Blog.updateOne(
    //   { _id: req?.params.id },
    //   { $set: { likes: data.likes} }
    // );

    // count the likes
    const totalLikes = data.likes.length;

    res.status(202).send({
      error: false,
      data,
      totalLikes,
      new: await Blog.findOne({ _id: req?.params.id }),
    });
  },

  addComment: async (req, res) => {
    const data = await Blog.findOne({ _id: req?.params.id });

    data.comments.push(req.body);

    await data.save();

    res.status(201).send({
      error: false,
      data,
    });
  },
  deleteComment: async (req, res) => {
    const data = await Blog.findOne({ _id: req?.params.id });

    const blogId = req.params.id; // blogId comes from route
    const commentId = req.params.commentId; // commentId comes from route

    console.log("commentId:", commentId);
    console.log("req.user._id:", req.user._id);
    console.log("Blog data:",data)
    
    //find the comment want to delete
    const deletedComment = data.comments.find((comment) =>comment._id.toString() === commentId &&comment.user.toString() === req.user._id.toString());

    console.log("deletedComment:", deletedComment);

    if (deletedComment) {
      const updatedComments = data.comments.filter((comment) => comment._id.toString() !== commentId);
      data.comments = updatedComments;

      // update blog comments data
      await data.save()
      
      console.log("Updated Comments:", updatedComments);

      res.status(204).send("silindi");
    } else{
      res.errorSatatusCode=403;
     throw new Error("You can not delete the comment!")
    }
  },
};
