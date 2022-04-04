import { UserSchema } from './UserModel';

const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

export const SuggestionSchema = new Schema({
  id: String,
  title: String,
  description: String,
  parentId: String, // question id
  parentType: String, // "question"
  // direction:String, //is it rtl or ltr
  // language: String, //hebrew, arabic, english, etc
  locale: String,
  // image: String,
  date: Date,
  likes: { type: Map, of: Boolean, default: new Map() },
  roles: {
    creator: UserSchema,
    // admins:[UserSchema],
    // participants:[UserSchema]
  },

});

export const Solution = mongoose.model('Solution', SuggestionSchema);

export default Solution;
