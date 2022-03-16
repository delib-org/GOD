import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { set, get, findIndex, values, keyBy } from "lodash";
import { Solution } from "types";
import { QuestionSchema } from "./createQuestionReducer";
import type { RootState } from "../store";

function getAllQuestions() {
  return new Promise((resolve, reject) => {
    axios
      .post("/questions/get-all", {})
      .then(({ data }) => {
        if (Array.isArray(data.result)) resolve(data.result);
        else reject();
      })
      .catch((e: Error) => {
        console.error(e);
        reject(e);
      });
  });
}

export const getQuestionsThunk = createAsyncThunk(
  "questions/getQuestions",
  async () => getAllQuestions()
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {},
  reducers: {
    upsertQuestion: (state, action: PayloadAction<any>) => {
      const { payload: question } = action;
      // @ts-ignore
      state[question._id] = question;
    },
    addSolution: (state, action: PayloadAction<any>) => {
      const { payload: solution } = action;
      const question = get(state, solution.parentId) as QuestionSchema;
      question.solutions.push(solution);
    },
    likeSolution: (state, action: PayloadAction<any>) => {
      const {
        payload: { qid, sid, userId, vote },
      } = action;
      const question = get(state, qid) as QuestionSchema;
      const i = findIndex(question.solutions, (s: Solution) => s._id === sid);
      if (!question.solutions[i].likes) {
        question.solutions[i].likes = {};
      }
      question.solutions[i].likes[userId] = vote;
    },
    voteSolution: (state, action: PayloadAction<Vote>) => {
      const {
        payload: { questionId, solutionId, userId },
      } = action;
      const question = get(state, questionId) as QuestionSchema;
      const previousVote = get(question, `votes.${userId}`, false);
      if (previousVote === false) {
        set(question, `votes.${userId}`, solutionId);
      } else {
        //delete
        question.votes[userId] = false;
      }
    },
    publishQuestion: (state, action: PayloadAction<any>) => {
      const {
        payload: { questionId },
      } = action;
      const question = get(state, questionId) as QuestionSchema;
      question.status = "pending";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsThunk.fulfilled, (state: any, action: any) =>
      keyBy(action.payload, "_id")
    );
  },
});

export const { voteSolution } = questionsSlice.actions;

// actions
interface NewQuestionPayload {
  title: string;
  description: string;
  image: any;
  status?: string;
}

export interface Vote {
  questionId:string;
  solutionId: string;
  userId: string;
}

export const upsertQuestion =
  (question: NewQuestionPayload, cb?: Function) => async (dispatch: any) => {
    try {
      if (!question.title) return;
      const { data } = await axios.post("/questions/upsert", question);
      dispatch(questionsSlice.actions.upsertQuestion(data));
      if (cb) cb();
    } catch (error) {
      console.error(error);
    }
  };

export const publishQuestion =
  (questionId: string, cb?: Function) => async (dispatch: any) => {
    try {
      await axios.post("/questions/activate", { activate: true, questionId });
      dispatch(questionsSlice.actions.publishQuestion({ questionId }));
      if (cb) cb();
    } catch (e) {
      console.error(e);
    }
  };

export const addSolution = (solution: Solution) => async (dispatch: any) => {
  try {
    const { data } = await axios.post("/questions/add-solution", solution);

    dispatch(questionsSlice.actions.addSolution(data));
  } catch (error) {
    console.error(error);
  }
};

export const likeSolution =
  (qid: string, sid: string, userId: string, vote: boolean) =>
  async (dispatch: any) => {
    try {
      const { data } = await axios.post("/questions/like-solution", {
        sid,
        vote,
      });

      console.log("likeSolution", { data });

      dispatch(
        questionsSlice.actions.likeSolution({
          qid,
          sid,
          vote: data.resolvedVote,
          userId,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

// selectors
export const allQuestions = (state: RootState) => state.questions;
export const allQuestionsArray = (state: RootState) => values(state.questions);
export const questionById = (qid: string) => (state: RootState) =>
  get(state, ["questions", qid], {}) as QuestionSchema;

const questionsReducer = questionsSlice.reducer;

export default questionsReducer;
