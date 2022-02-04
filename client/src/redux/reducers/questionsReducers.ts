import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getAllQuestions ,getNewQuestions} from "../../controlers/questions/questions";

import { QuestionSchema } from "./createQuestionReducer";

export const getQuestionsThunk = createAsyncThunk(
  "questions/getQuestions",
  async (thunkAPI) => {
    const questions: any = await getAllQuestions();
    return formatQuestions(questions);
  }
);

export const getNewQuestionsThunk = createAsyncThunk(
  "questions/getNewQuestions",
  async (thunkAPI) => {
    const date_created = (state: RootState) => state.questions.date_created;
    const question  = await getNewQuestions(date_created)
  }
);

function formatQuestions(questions:Array<QuestionSchema>){
  let date_created = new Date();
  const unregisterdQustions = questions.map((question: any) => {
    const newQuestion = question;
    newQuestion.notification = false;
    console.log("date_created" in newQuestion);
    if (
      "date_created" in newQuestion &&
      date_created < newQuestion.date_created
    )
      date_created = newQuestion.date_created;
    return newQuestion;
  });
  return {questions:unregisterdQustions, date_created};
}

interface QuestionsSchema {
  questionsLoder: boolean;
  questions: Array<QuestionSchema>;
  error: boolean | string;
  date_created: Date;
}

const initialState = {
  questionsLoder: false,
  questions: [],
  error: false,
  date_created: new Date(1),
} as QuestionsSchema;

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsThunk.pending, (state: any, action: any) => {
        state.questionsLoder = true;
      })
      .addCase(getQuestionsThunk.fulfilled, (state: any, action: any) => {
        console.log(action.payload);
        state.questions = action.payload.questions;
        state.date_created = action.payload.date_created;
        state.questionsLoder = false;
      })
      .addCase(getQuestionsThunk.rejected, (state: any, action: any) => {
        state.questionsLoder = false;
        state.error = action.payload;
      });
  },
});

export const allQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;
