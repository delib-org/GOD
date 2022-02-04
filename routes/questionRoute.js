"use strict";
exports.__esModule = true;
var isLoggedIn_1 = require("../middlewares/isLoggedIn");
var router = require('express').Router();
var questionCont_1 = require("../controlers/questionCont");
router
    .post('/create', isLoggedIn_1["default"], questionCont_1.createQuestion)
    .post('/activate', isLoggedIn_1["default"], questionCont_1.activateQuestion)
    .post('/get-all', isLoggedIn_1["default"], questionCont_1.getAllQuestions)
    .post('/get-new', isLoggedIn_1["default"], questionCont_1.getNewQuestions);
exports["default"] = router;
