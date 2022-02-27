import { lookupService } from 'dns';
import {UserSchema} from './UserModel'
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;




export const QuestionVoteSchema = new Schema({
    id: String,
    parentId: String, //question id
    parentType:String, //"question"
    direction:String, //is it rtl or ltr
    language: String, //hebrew, arabic, english, etc
    date: Date,
    
});

export const VoteSchema = new Schema({
    userId: String, //userId
    parentId: String, //question id
    date: Date,
    selectedOption:String
    
});

