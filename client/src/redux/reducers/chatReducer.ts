import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

export interface Message {
  id: string;
  text: string;
  creatorId: string;
  creatorDisplayName: string;
  parentId: string;
  parentType: "question";
  error: boolean;
}
interface Chat {
  messages: Array<Message>;
}

function getDiscussion(qid: string){
  return new Promise((resolve, reject)=>{
    axios.post('/discussion/get-discussion', {qid})
        .then(({ data }) => {
          if(Array.isArray(data.result)) resolve(data.result);
          else reject()
        }).catch(e => {
      console.error(e)
      reject();
    })
  })
}

export const getDiscussionThunk = createAsyncThunk(
    'discussion/getDiscussion',
    async (qid: string) => await getDiscussion(qid)
)

const initialState = {
  messages: [],
} as Chat;

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: { payload: Message; type: string }) => {
      console.log("add message");
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: builder => {
    builder
        .addCase(getDiscussionThunk.fulfilled, (state: any, action: any) => {
          state.messages = action.payload
        })
  }
});

export const { addMessage } = chatSlice.actions;

//selectors
export const allMessages = (state: RootState) => state.chats.messages;

export default chatSlice.reducer;
