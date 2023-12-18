"use strict";

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {

    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
    */

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

    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Create Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { 
                      "title": "new blog",
                      "category": "65611e3124e11f7fcf5f5790",
                      "content": "content ",
                      "image": "URL",
                      "status": "Draft or Published"
                    
                }
            }
    */
    //add user id to author
    const data = await Blog.create({ ...req.body, author: req.user._id });

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {

    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
    */

    let data = await Blog.findOne({ _id: req.params.id });

    // save unique readers id's into visitors and inc views +1
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

    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {                   
                    "title": "new title",
                    "category": "65611e3124e11f7fcf5f5790",
                    "content": "new content",
                    "image": "URL",
                    "author": "65611e1324e11f7fcf5f578a",
                    "status": "Draft or Published"
                  
                }
            }
    */

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

    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
    */

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

    /*
            #swagger.tags = ["Like"]
            #swagger.summary = "Like or Remove Like Blog"
    */

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

    /*
            #swagger.tags = ["Blog Comment"]
            #swagger.summary = "Add Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {                   
                    "text": "new title",                                     
                }
            }
    */


    const data = await Blog.findOne({ _id: req?.params.id });

    // get the user id from req.user
    const newComment = {
      text: req.body.text,
      user: req.user._id, 
    };

    data.comments.push(newComment);

    await data.save();

    res.status(201).send({
      error: false,
      data,
    });
  },
  deleteComment: async (req, res) => {

    /*
            #swagger.tags = ["Blog Comment"]
            #swagger.summary = "Delete Comment"
    */

    const data = await Blog.findOne({ _id: req?.params.id });

    // const blogId = req.params.id; // blogId comes from route
    const commentId = req.params.commentId; // commentId comes from route
   
    //find the comment want to delete
    const deletedComment = data.comments.find((comment) =>comment._id.toString() === commentId &&comment.user.toString() === req.user._id.toString());
    
    if (deletedComment) {
      const updatedComments = data.comments.filter((comment) => comment._id.toString() !== commentId);
      data.comments = updatedComments;

      // update blog comments data
      await data.save()
     
      res.status(204).send("Comment deleted");
    } else{
      res.errorSatatusCode=403;
     throw new Error("You can not delete the comment!")
    }
  },
};
