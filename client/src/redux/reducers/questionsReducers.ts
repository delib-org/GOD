import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { getAllQuestions } from '../../controlers/questions/questions';

export const getQuestionsThunk = createAsyncThunk(
    'questions/getQuestions',
    async (thunkAPI) => {
        const questions = await getAllQuestions();
        return questions
    }
)

interface QuestionsSchema {
     
    questionsLoder:boolean,
    questions:[],
    error:boolean | string
}

const initialState = {
   
    questionsLoder:false,
    questions:[],
    error:false
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
          state.questions = action.payload;
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
