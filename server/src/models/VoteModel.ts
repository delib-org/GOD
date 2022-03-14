const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

export const VoteSchema = new Schema({
  userId: String, // userId
  parentId: String, // question id
  parentType:String, //question
  date: Date,
  selectedOption: String,

});

const VoteModel = mongoose.model("Votes", VoteSchema);
export default VoteModel;
