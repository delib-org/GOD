const mongoose = require("mongoose");
import { UserSchema } from "./UserModel";

// Define a schema
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  fileName: String,
  fileUrl: String,
});

export const QuestionSchema = new Schema({
  title: String,
  description: String,
  files: [FileSchema],
  members: { type: [String], index: true },
  creatorId: String,
  admins: [UserSchema],
  last_entered: Date,
  role: String,
  image: Map,
  status: {
    type: String,
    enum: ['draft', 'pending', 'suggestions', 'vote', 'closed', 'deleted'],
    default: 'draft',
  },
  // status: {
  //   draft: Boolean,
  //   pending: Boolean,
  //   suggestions: Boolean,
  //   vote: Boolean,
  //   closed: Boolean,
  //   deleted: Boolean,
  // },
  solutions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution",
    },
  ],
  watchlist: Object,
});

export const Question = mongoose.model("Question", QuestionSchema);

export default Question;
