import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import {
  activateQuestion, addSolution, upsertQuestion, getAllQuestions, setSolutionLike,
} from '../controlers/questionCont';

router
  .post('/upsert', isLoggedIn, upsertQuestion)
  .post('/activate', isLoggedIn, activateQuestion)
  .post('/get-all', isLoggedIn, getAllQuestions)
  .post('/add-solution', isLoggedIn, addSolution)
  .post('/like-solution', isLoggedIn, setSolutionLike);

export default router;
