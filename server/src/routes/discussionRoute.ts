import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import { getDiscussion } from '../controlers/discussionCont';

router
    .post('/get-discussion',isLoggedIn, getDiscussion)
    

export default router;