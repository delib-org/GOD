"use strict";
exports.__esModule = true;
exports.QuestionSchema = void 0;
var mongoose = require('mongoose');
var userModel_1 = require("./userModel");
//Define a schema
var Schema = mongoose.Schema;
var FileSchema = new Schema({
    fileName: String,
    fileUrl: String
});
exports.QuestionSchema = new Schema({
    title: String,
    description: String,
    files: [FileSchema],
    coverImage: String,
    members: { type: [String], index: true },
    creatorId: String,
    admins: [userModel_1.UserSchema],
    date_created: Number,
    date_end: Number,
    role: String,
    image: Map,
    active: Boolean,
    draft: Boolean,
    status: {
        draft: Boolean,
        active: Boolean,
        suggestions: Boolean,
        vote: Boolean,
        closed: Boolean,
        deleted: Boolean
    },
    participents: {
        userId: String,
        pushNotifications: {
            token: String,
            events: Array //[2hrs:true, voteResults:true]
        }
    }
});
var QuestionModel = mongoose.model('QuestionModel', exports.QuestionSchema);
exports["default"] = QuestionModel;
