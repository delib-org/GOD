import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { getAllQuestions } from '../../controlers/questions/questions';



export interface Message {
     
    message:string;
    creatorId:string;
    creatorDisplayName:string;
    parentId:string;
    parentType:'question';
}
interface Chat {
    messages:Array<Message>
}

const initialState = {
   
   messages:[]
  } as Chat;

  export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action:{payload:Message, type:string}) => {

            state.messages = [...state.messages,action.payload ]
          },
    },
    
  })

  export const { addMessage } = chatSlice.actions

  export const allMessages = (state: RootState) => state.chats.messages;

  export default chatSlice.reducer
