const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

export const SolutionSchema = new Schema({
  parentId: String, // question id
  parentType: String, // "question"
  direction: String, // is it rtl or ltr
  language: String, // hebrew, arabic, english, etc
  date: Date,
  votes: [],
  likes: [],
});

export const VoteSchema = new Schema({
  userId: String, // userId
  parentId: String, // question id
  date: Date,
  selectedOption: String,
});
