const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  id: String,
  displayName: String,
  name: { givenName: String, familyName: String },
  email_verified: Boolean,
  language: String,
  locale: String,
  email: String,
  picture: String,
//   last_entered: Date,[
//   {
//     entityId: String,
//     status: String,
    
//     notifications: Array, //which elements to follow  //[2hours:true]
//   },
// ]
});

// const UserModel = mongoose.model('UserModel',UserSchema)

// export default UserModel;
