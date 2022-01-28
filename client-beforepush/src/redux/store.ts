import {ThunkAction, configureStore,Action } from '@reduxjs/toolkit';
import newQuestionSlice from './reducers/createQuestionReducer';
import questionsSlice from './reducers/questionsReducers';

const store = configureStore({
  reducer: {
  
    newQuestion:newQuestionSlice,
    questions:questionsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store;