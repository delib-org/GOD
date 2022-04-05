import Question from '../models/QuestionModel';
import User from '../models/UserModel';
import Solution from '../models/SuggestionModel';
import { get } from 'lodash'

const ObjectId = require('mongoose').Types.ObjectId;

export async function upsertQuestion(req: any, res: any) {
  try {
    // get question
    const question = req.body;
    const creatorId = req.user.id
   console.log(question)
    if (question._id) {
      // update
      const response = await Question.findOneAndUpdate({ _id: new ObjectId(question._id) }, question);
      res.send({ update: true, response });
    } else {
      // create new question
      question.creatorId = creatorId;
      question.members = [creatorId];
      question.watchlist = { [creatorId]: true }
      const result = await Question.create(question);
      res.send(result);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function activateQuestion(req: any, res: any): Promise<void> {
  try {
    const { questionId } = req.body;
    if (typeof questionId === 'string') {
      const result = await Question.updateOne({ _id: new ObjectId(questionId) }, { status: 'pending' });
      res.send({ result, ok: true });
    } else {
      res.send({ error: `Error updating question ${questionId}` });
    }
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function getAllQuestions(req: any, res: any): Promise<void> {
  try {
    if (!{}.hasOwnProperty.call(req, 'user')) throw new Error('No user in request');
    const userId = req.user.id;

    const result = await Question.find({
      members: userId,
    })
      .populate('solutions');

    res.send({ result, ok: true });
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function addSolution(req: any, res: any) {
  try {
    const user = await User.findOne({ id: req.user.id });

    const solutionData = {
      ...req.body,
      date: new Date(),
      roles: {
        creator: user,
      },
    };

    const solution = await Solution.create(solutionData);

    const question = await Question.findOne({ _id: new ObjectId(req.body.parentId) });
    question.solutions.push(solution._id);
    await question.save();

    res.send(solution);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export const setSolutionLike = async (req: any, res: any) => {
  try {
    const { sid, vote } = req.body;
    const userId = req.user.id;

    const key = `likes.${userId}`;

    const solution = await Solution.findById(sid)
    const userVote = solution.likes.get(userId)
    const resolvedVote = vote === userVote ? null : vote

    await Solution.updateOne(
      { _id: sid },
      {
        $set: {
          [key]: resolvedVote,
        },
      },
    );

    res.send({ resolvedVote });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const toggleWatch = async (req: any, res: any) => {
  try {
    const { questionId } = req.body;
    if (typeof questionId !== 'string') {
      return res.send({ error: `Error updating question ${questionId}` });
    }

    const userId = req.user.id
    const question = await Question.findById(new ObjectId(questionId))
    const isWatching = get(question.watchlist, userId, false)

    await Question.updateOne(
      { _id: questionId },
      {
        $set: {
          [`watchlist.${userId}`]: !isWatching,
        },
      },
    );

    res.send({ isWatching: !isWatching });
  } catch (error: any) {
    res.send({ error: error.message });
  }
}