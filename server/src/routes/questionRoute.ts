import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import { activateQuestion, createQuestion, getAllQuestions } from '../controlers/questionCont';

router
    .post('/create',isLoggedIn, createQuestion)
    .post('/activate', isLoggedIn, activateQuestion)
    .post('/get-all', isLoggedIn, getAllQuestions)
    

export default router;