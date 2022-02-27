import {UserSchema} from './UserModel'

const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const EvaluationsSchema = new Schema({
    likes:Object
});


export const SuggestionSchema = new Schema({
    id: String,
    title: String,
    description: String,
    parentId: String, //question id
    parentType:String, //"question"
    direction:String, //is it rtl or ltr
    language: String, //hebrew, arabic, english, etc
    locale: String,
    image: String,
    date: Date,
    evaluations:EvaluationsSchema,
    roles:{
        creator:UserSchema,
        admins:[UserSchema],
        participents:[UserSchema]
    }
    
});
