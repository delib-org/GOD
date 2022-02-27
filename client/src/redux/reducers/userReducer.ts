import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import _ from 'lodash'
import axios from "axios";

export interface User {
  displayName: string;
  id: string;
  role: string;
  loader: boolean;
  status: string;
}

export async function getUser() {
  try {
    const { data } = await axios.get("/user/get-user");
    const {user} = data;

    return user;
  } catch (err) {
    console.error(err);
  }
}

//thunk for upload image
export const getUserThunkReducer = createAsyncThunk(
  "user/getUser",
  async () => {
 
    const userDB = await getUser();
    return userDB;
  }
);

const initialState = {
  displayName: "",
  id: "",
  role: "public",
  loader: false,
  status: "",
} as User;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunkReducer.pending, (state: any, action: any) => {
        state.loader = true;
      })
      .addCase(getUserThunkReducer.fulfilled, (state: any, action: any) => {
     
        const { displayName, id } = action.payload || {};
      
        state.displayName = displayName;
        state.id = id;
        state.status = "success";
        state.loader = false;
      })
      .addCase(getUserThunkReducer.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.loader = false;
      });
  },
});

export const userSelector = (state: RootState) => _.get(state, 'user', {}) as User

export default userSlice.reducer;
