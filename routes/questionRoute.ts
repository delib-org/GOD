import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import { activateQuestion, createQuestion, getAllQuestions,getNewQuestions } from '../controlers/questionCont';

router
    .post('/create',isLoggedIn, createQuestion)
    .post('/activate', isLoggedIn, activateQuestion)
    .post('/get-all', isLoggedIn, getAllQuestions)
    .post('/get-new',isLoggedIn, getNewQuestions)
    

export default router;