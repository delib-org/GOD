import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import {
  activateQuestion,
  addSolution,
  upsertQuestion,
  getAllQuestions,
  setSolutionLike,
  toggleWatch,
} from '../controlers/questionCont';

router
  .post('/upsert', isLoggedIn, upsertQuestion)
  .post('/activate', isLoggedIn, activateQuestion)
  .post('/get-all', isLoggedIn, getAllQuestions)
  .post('/add-solution', isLoggedIn, addSolution)
  .post('/like-solution', isLoggedIn, setSolutionLike)
  .post('/toggle-watch', isLoggedIn, toggleWatch);

export default router;
