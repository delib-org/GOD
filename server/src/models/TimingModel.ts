const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

export const TimingSchema = new Schema({
  time: Date,
  title: String,
  id: String,
  parentId: String, //questionId
  parentType: 'question',
});

const TimingModel = mongoose.model("Timing", TimingSchema);
export default TimingModel
