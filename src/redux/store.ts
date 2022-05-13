import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import createQuestionReducer from './reducers/createQuestionReducer';
import questionsReducer from './reducers/questionsReducers';
import userReducer from './reducers/userReducer';
import chatReducer from './reducers/chatReducer';
import { apiSlice, apiMiddleware } from './modules/api';

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    newQuestion: createQuestionReducer,
    questions: questionsReducer,
    user: userReducer,
    chats: chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export default store;
