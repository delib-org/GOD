import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getUser } from "../../controlers/user/user";

export interface User {
  displayName: string;
  id: string;
  role: string;
  loader: boolean;
  status: string;
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
     
        const { displayName, id } = action.payload;
      
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

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;
