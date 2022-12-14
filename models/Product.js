const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { categorySchema } = require("../models/Category");

const commentSchema = new Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastUpdatedAt: {
    type: Date,
    required: true,
  },
});

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    min: 0,
  },
  delivery: {
    type: Boolean,
  },
  images: [{ imageName: { type: String } }],
  prices: [
    {
      currency: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      discount: { type: Number, min: 0, max: 100 },
    },
  ],
  categories: [categorySchema],
  comments: [commentSchema],
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastUpdatedAt: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
