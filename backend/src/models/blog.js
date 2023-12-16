"use strict"
// Sample req.body
/* {
  "title": "title",
  "category": "..id..", 
  "content": "content",
  "image": "", 
  "author": "..id..", 
  "status": "Draft", 
  "visitors": ["..id1..","..id2.."], 
  "comments": [
    {
      "text": "comment1",
      "user": "..id1.." 
    },
    {
      "text": "comment2",
      "user": "..id2.." 
    }
  ],
  "likes": ["..id1..","..id2.."], 
  "views": 100
} */

const {mongoose } = require("mongoose")
// const {mongoose} = require("../configs/dbConnection")

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique:[true, "The blog title has already used!"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Published", "Draft"],
        default: "Draft"
    },
    visitors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',        
        }
    ],
    comments: [
        {
            text: {type:String,required:true},
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
           
        }
    ],
    views: {
        type: Number,
        default: 0
    }
}, { collection: "blogs", timestamps: true });

module.exports=mongoose.model("Blog",BlogSchema)

