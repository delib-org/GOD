import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { uploadFile } from 'utils/uploadFile';
import { Image } from 'utils/image';

// thunk for upload image
export const uploadFileThunk = createAsyncThunk(
  'newQuestion/uploadQuestion',
  async (file: File) => {
    console.log(file);
    return await uploadFile(file);
  },
);

// Define a type for the slice state
export interface QuestionSchema {
  questionId: string | boolean;
  pageNumber: number, // number of page
  title: string,
  image: Image,
  status: string,
  description: string,
  loader: boolean,
  enableMoveTo2: boolean,
  enableMoveTo3: boolean,
  active: boolean,
  solutions: any,
}

// Define the initial state using that type
const initialState = {
  questionId: false,
  pageNumber: 1,
  title: '',
  description: '',
  image: {},
  status: 'draft',
  loader: false,
  enableMoveTo2: false,
  enableMoveTo3: false,
  active: false,
  solutions: [],
} as QuestionSchema;

export const createQuestionSlice = createSlice({
  name: 'newQuestion',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
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
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state: any) => {
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
  },
});

export const {
  setTitle, setDescription, setEnableMoveTo2, setEnableMoveTo3, clear
} = createQuestionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const newQuestionSelector = (state: RootState) => state.newQuestion;

const createQuestionReducer = createQuestionSlice.reducer;

export default createQuestionReducer;
