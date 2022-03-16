import React, { FC, useState } from 'react';
// matrial UI
import TextField from '@mui/material/TextField';
import { NextButton } from "components/Wizard";
import {
  newQuestionSelector,
  setTitle,
  setEnableMoveTo2,
} from 'redux/reducers/createQuestionReducer';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion1: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const { title, enableMoveTo2: enableNext } = useAppSelector(newQuestionSelector);
  const dispatch = useAppDispatch();
  const { path } = props;

  // state
  const maxChar = 140;
  const [charCount, setCharCount] = useState(title.length);
  const [charClass, setCharClass] = useState('charCount--min');

  function handleChange(ev: any) {
    const charCountVar = ev.target.value.length;
    setCharCount(ev.target.value.length);

    if (charCountVar > 6 && charCountVar < maxChar) {
      setCharClass('charCount--ok');
      dispatch(setTitle(ev.target.value));
      dispatch(setEnableMoveTo2(true));
    } else if (charCountVar <= 6) {
      setCharClass('charCount--min');
      dispatch(setEnableMoveTo2(false));
    } else {
      ev.target.value = ev.target.value.slice(0, -1);
    }
  }

  return (
    <div>
      <div className="wrapper">
        <h1>What is the Issue / problem / question you would like to present?</h1>
        <p>This will be the title, which will appear at the top. Keep the description short and to the point.</p>
        <TextField id="standard-basic" defaultValue={title} label="Question Title" multiline rows={3} variant="outlined" fullWidth type="text" name="username" onChange={handleChange} />
        <div className={`charCount ${charClass}`}>({charCount}/{maxChar})</div>
      </div>
      <div className="bottomNavButtons">
        <NextButton linkTo={enableNext ? `${path}/2` : ''} disabled={!enableNext} />
      </div>
    </div>
  );
};

export default CreateQuestion1;
