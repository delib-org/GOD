import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export interface User {
  displayName: string;
  id: string;
  role: string;
  loader: boolean;
  status: string;
}

export async function getUser() {
  try {
    const { data } = await axios.get('/user/get-user');
    const { user } = data;

    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

// thunk for upload image
export const getUserThunkReducer = createAsyncThunk(
  'user/getUser',
  async () => {
    const userDB = await getUser();
    return userDB;
  },
);

const initialState = {
  displayName: '',
  id: '',
  role: 'public',
  loader: false,
  status: '',
} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunkReducer.pending, (state: any) => {
        state.loader = true;
      })
      .addCase(getUserThunkReducer.fulfilled, (state: any, action: any) => {
        const { displayName, id } = action.payload || {};

        state.displayName = displayName;
        state.id = id;
        state.status = 'success';
        state.loader = false;
      })
      .addCase(getUserThunkReducer.rejected, (state: any) => {
        state.status = 'failed';
        state.loader = false;
      });
  },
});

export const userSelector = (state: RootState) => state.user;

const userReducer = userSlice.reducer;

export default userReducer;
