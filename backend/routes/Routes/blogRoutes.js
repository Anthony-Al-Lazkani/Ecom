const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Blogs = require("../../models/blogModel");
require("dotenv").config();
const mongoose = require("mongoose");

//GET all Blogs
router.get("/getAllBlogs", async (req, res) => {
  const blogs = await Blogs.find();

  return res.status(200).json({ blogs });
});

// GET Single blog
router.get("/getSingleBlog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    // Find the blog by ID
    const blog = await Blogs.findOne({ _id: id });

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send the blog if found
    return res.status(200).json(blog);
  } catch (error) {
    // Handle errors
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

// POST single blog
router.get("/getSingleBlog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    // Find the blog by ID
    const blog = await Blogs.findOne({ _id: id });
    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send the blog if found
    return res.status(200).json(blog);
  } catch (error) {
    // Handle errors
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

// PUT update an existing blog
router.put("/updateBlog/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const response = await Blogs.findOneAndUpdate(
      { _id: id },
      { $set: { title: title } }
    );

    if (!response) {
      return res.status(400).json({ message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ message: "Blog Updated Successfully", response });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Server Error" });
  }
});

// DELETE a blog
module.exports = router;
