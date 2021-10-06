import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

// Define a type for the slice state
interface CounterState {
  value: number,
  title: string,
  description:string
}

// Define the initial state using that type
const initialState = {
  value: 1,
  title:'',
  description:''
} as CounterState;

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {

      if(state.value<4) state.value += 1;
    },
    decrement: (state) => {
      if(state.value>1)state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setTitle: (state, action: PayloadAction<string>)=>{
      state.title = action.payload;
    },
    setDescription:(state, action: PayloadAction<string>)=>{
      state.description = action.payload;
    }
  },
})

export const { increment, decrement, incrementByAmount,setTitle,setDescription } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;
export const selectTitle = (state:RootState) => state.counter.title;
export const selectDescription = (state:RootState) => state.counter.description;

export default counterSlice.reducer