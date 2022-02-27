import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {RootState} from '../store';
import axios from "axios";
import _ from 'lodash'
import {QuestionSchema} from "./createQuestionReducer";

function getAllQuestions(){
    return new Promise((resolve, reject)=>{
        axios.post('/questions/get-all', {})
            .then(({ data }) => {
                if(Array.isArray(data.result)) resolve(data.result);
                else reject()
            }).catch(e => {
            console.error(e)
            reject();
        })
    })
}

export const getQuestionsThunk = createAsyncThunk(
    'questions/getQuestions',
    async (thunkAPI) => await getAllQuestions()
)

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getQuestionsThunk.fulfilled, (state: any, action: any) => {
                return action.payload
            })
    }
})

export const allQuestions = (state: RootState) => state.questions
export const questionById = (qid: string) => (state: RootState) => (_.find(state.questions, {_id: qid}) || {}) as QuestionSchema

export default questionsSlice.reducer
