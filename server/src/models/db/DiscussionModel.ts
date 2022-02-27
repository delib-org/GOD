import {UserSchema} from './UserModel'
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const EvaluationsSchema = new Schema({
    likes:Object
});

export const MessageSchema = new Schema({
    id: String,
    text: String,
    parentId: String, //question id
    parentType:String, //"question"
    // direction:String, //is it rtl or ltr
    // language: String, //hebrew, arabic, english, etc
    image: String,
    date: Date,
    evaluations:EvaluationsSchema,
    roles:{
        creator:UserSchema
    }
    
});
