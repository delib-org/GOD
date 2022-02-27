import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store';
import { uploadFile } from 'utils/uploadFile';
import { Image } from 'utils/image'
import axios from "axios";

export interface ActiveQuestionObject{
  isActive:boolean;
  questionId:string;
}

export async function activateQuestion(activate: boolean, questionId: string) {
  return new Promise((resolve, reject) => {
    try {
      axios.post('/questions/activate', {activate, questionId}).then(({data}) => {
        if (data.ok) {
          resolve(activate);
        } else {
          reject(false);
        }
      })
    } catch (e) {
      console.error(e);
      reject(false);
    }
  })
}

export async function createUpdateQuestion(title: string, description: string, image: any, questionId?: string): Promise<any> {
  try {
    const {data} = await axios.post('/questions/create', {title, description, image, questionId})

    if (data) return data.questionId;
    else return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

//thunk for upload image
export const uploadFileThunk = createAsyncThunk(
  'newQuestion/uploadQuestion',
  async (file: File, thunkAPI) => {
    console.log(file);
    const fileData = await uploadFile(file);
    return fileData;
  }
)


//thunk for activate question
export const activateQuestionThunk = createAsyncThunk(
  'newQuestion/activateQuestion',
  async (isActivateObj:ActiveQuestionObject, thunkAPI) => {
    const {isActive, questionId} = isActivateObj;
    const isActivateDB = await activateQuestion(isActive, questionId);
    return isActivateDB;
  }
)



// Define a type for the slice state
export interface QuestionSchema {
  questionId: string | boolean;
  pageNumber: number, //number of page
  title: string,
  image: Image,
  status: string,
  description: string,
  loader: boolean,
  enableMoveTo2: boolean,
  enableMoveTo3: boolean,
  activate: boolean
}

// Define the initial state using that type
const initialState = {
  questionId: false,
  pageNumber: 1,
  title: '',
  description: '',
  image: {},
  status: '',
  loader: false,
  enableMoveTo2: false,
  enableMoveTo3: false,
  activate: false
} as QuestionSchema;

export const questionsSlice = createSlice({
  name: 'newQuestion',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {

      if (state.pageNumber < 4) state.pageNumber += 1;
    },
    decrement: (state) => {
      if (state.pageNumber > 1) state.pageNumber -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.pageNumber += action.payload
    },
    setQuestionId: (state, action: PayloadAction<string>) => {
      state.questionId = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setEnableMoveTo2: (state, action) => {
      state.enableMoveTo2 = action.payload;
    },
    setEnableMoveTo3: (state, action) => {
      state.enableMoveTo3 = action.payload;
    },
    setActivate: (state, action) => {
      console.log(action)
      state.activate = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadFileThunk.pending, (state: any, action: any) => {
        state.status = 'pending';
        state.loader = true;
      })
      .addCase(uploadFileThunk.fulfilled, (state: any, action: any) => {
        state.image = JSON.parse(action.payload);
        state.status = 'success';
        state.loader = false;
      })
      .addCase(uploadFileThunk.rejected, (state: any, action: any) => {
        state.image = action.payload;
        state.status = 'failed';
        state.loader = false;
      })
      .addCase(activateQuestionThunk.pending, (state:any, action:any)=>{
        state.status = 'pending';
        state.loader = true;
      })
      .addCase(activateQuestionThunk.fulfilled, (state: any, action: any) => {
        state.image = JSON.parse(action.payload);
        state.status = 'success';
        state.loader = false;
      })
      .addCase(activateQuestionThunk.rejected, (state: any, action: any) => {
        state.image = action.payload;
        state.status = 'failed';
        state.loader = false;
      })
  }
})

export const { increment, decrement, incrementByAmount, setQuestionId, setTitle, setDescription, setEnableMoveTo2, setEnableMoveTo3, setActivate } = questionsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectQuestion = (state: RootState) => state.newQuestion
export const selectCount = (state: RootState) => state.newQuestion.pageNumber;
export const selectTitle = (state: RootState) => state.newQuestion.title;
export const selectDescription = (state: RootState) => state.newQuestion.description;
export const selectLoader = (state: RootState) => state.newQuestion.loader;
export const selectImage = (state: RootState) => state.newQuestion.image;
export const selectEnableMoveTo2 = (state: RootState) => state.newQuestion.enableMoveTo2;
export const selectEnableMoveTo3 = (state: RootState) => state.newQuestion.enableMoveTo3;
export const selectQuestionId = (state: RootState) => state.newQuestion.questionId;


export default questionsSlice.reducer