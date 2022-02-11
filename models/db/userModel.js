"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose = require("mongoose");
//Define a schema
var Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    id: String,
    displayName: String,
    name: { givenName: String, familyName: String },
    email_verified: Boolean,
    language: String,
    locale: String,
    email: String,
    picture: String,
    last_entered: Date,
    entitiesParticipation: {
        entityId: String,
        status: String,
        notificatipons: Array
    }
});
// const UserModel = mongoose.model('UserModel',UserSchema)
// export default UserModel;
