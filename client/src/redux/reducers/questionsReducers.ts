import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { getAllQuestions } from '../../controlers/questions/questions';

import {QuestionSchema} from './createQuestionReducer';

export const getQuestionsThunk = createAsyncThunk(
    'questions/getQuestions',
    async (thunkAPI) => {
        const questions:any = await getAllQuestions();
        const lastAdded = new Date();
        const unregisterdQustions = questions.map((question:any)=>{ 
          const newQuestion = question;
          newQuestion.notification = false;
          return newQuestion;
        })
        console.log(unregisterdQustions)
        return {questions:unregisterdQustions, lastAdded}
    }
)

interface QuestionsSchema {
     
    questionsLoder:boolean,
    questions:Array<QuestionSchema>,
    error:boolean | string,
    lastAdded:Date
}

const initialState = {
   
    questionsLoder:false,
    questions:[],
    error:false,
    lastAdded:new Date(1)
  } as QuestionsSchema;

  export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
      builder
        .addCase(getQuestionsThunk.pending, (state:any, action:any)=>{
          state.questionsLoder = true;
        })
        .addCase(getQuestionsThunk.fulfilled, (state:any, action:any)=>{
          console.log(action.payload)
          state.questions = action.payload.questions;
          state.lastAdded = action.payload.lastAdded;
          state.questionsLoder = false;
        })
        .addCase(getQuestionsThunk.rejected, (state:any, action:any)=>{
          state.questionsLoder = false;
          state.error = action.payload;
        })
    }
  })

  export const allQuestions = (state: RootState) => state.questions.questions;

  export default questionsSlice.reducer
