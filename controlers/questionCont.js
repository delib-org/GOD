"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getNewQuestions = exports.getAllQuestions = exports.activateQuestion = exports.createQuestion = void 0;
var QuestionModel_1 = require("../models/db/QuestionModel");
var ObjectId = require("mongoose").Types.ObjectId;
var mongoose = require("mongoose");
var Question = mongoose.model("Question", QuestionModel_1.QuestionSchema);
function createQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var question, response, results, _id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    question = req.body;
                    question.creatorId = req.user.id;
                    question.members = [req.user.id];
                    if (!question.questionId) return [3 /*break*/, 2];
                    return [4 /*yield*/, Question.findOneAndUpdate({ _id: new ObjectId(question.questionId) }, question)];
                case 1:
                    response = _a.sent();
                    res.send({ update: true, response: response });
                    return [3 /*break*/, 4];
                case 2:
                    //create new question
                    question.active = false;
                    question.date_created = new Date().getTime();
                    return [4 /*yield*/, Question.create(question)];
                case 3:
                    results = _a.sent();
                    _id = results._id;
                    res.send({ questionId: _id, results: results });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(500).send({ error: error_1.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createQuestion = createQuestion;
function activateQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, activate, questionId, result, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, activate = _a.activate, questionId = _a.questionId;
                    if (!(typeof activate === "boolean" && typeof questionId === "string")) return [3 /*break*/, 2];
                    return [4 /*yield*/, Question.updateOne({ _id: new ObjectId(questionId) }, { activate: activate })];
                case 1:
                    result = _b.sent();
                    res.send({ result: result, ok: true });
                    return [3 /*break*/, 3];
                case 2: throw new Error("activate should be bollean but was " + typeof activate);
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    res.send({ error: error_2.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.activateQuestion = activateQuestion;
function getAllQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, result, i, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!{}.hasOwnProperty.call(req, "user"))
                        throw new Error("No user in request");
                    userId = req.user.id;
                    return [4 /*yield*/, Question.find({
                            members: userId
                        })];
                case 1:
                    result = _a.sent();
                    for (i in result) {
                        result[i].members = [req.user.id];
                        result[i].admins = [];
                    }
                    res.send({ result: result, ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log("In getAllQuestions: " + error_3.message);
                    res.send({ error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllQuestions = getAllQuestions;
function getNewQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, date_created, result, i, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!{}.hasOwnProperty.call(req, "user"))
                        throw new Error("No user in request");
                    userId = req.user.id;
                    date_created = req.body.date_created;
                    console.log(date_created);
                    if (!date_created)
                        throw new Error("no date_created in request");
                    return [4 /*yield*/, Question.find({
                            "date_created": {
                                $gte: date_created
                            }
                        })];
                case 1:
                    result = _a.sent();
                    for (i in result) {
                        result[i].members = [req.user.id];
                        result[i].admins = [];
                    }
                    res.send({ result: result, ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log("In getNewQuestions: " + error_4.message);
                    res.send({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNewQuestions = getNewQuestions;
