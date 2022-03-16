import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import { NextButton, BackButton } from "components/Wizard";
import {
  newQuestionSelector,
  setDescription,
  setEnableMoveTo3,
} from 'redux/reducers/createQuestionReducer';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion2: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const { description, enableMoveTo3: enableNext } = useAppSelector(newQuestionSelector);
  const dispatch = useAppDispatch();
  const { path } = props;

  // state
  const maxChar = 500;
  const [charCount, setCharCount] = useState(description.length);
  const [charClass, setCharClass] = useState('charCount--min');

  function handleChange(ev: any) {
    const charCountVar = ev.target.value.length;
    setCharCount(ev.target.value.length);

    if (charCountVar > 6 && charCountVar < maxChar) {
      setCharClass('charCount--ok');
      dispatch(setDescription(ev.target.value));
      dispatch(setEnableMoveTo3(true));
    } else if (charCountVar <= 6) {
      setCharClass('charCount--min');
      dispatch(setEnableMoveTo3(false));
    } else {
      ev.target.value = ev.target.value.slice(0, -1);
    }
  }

  return (
    <div>
      <div className="wrapper">
        <h1>Why is this important?</h1>
        <p>This is your call to action, the place to describe the issue and emphasize the importance of participating and voting in this discussion. This is your opportunity to interest the group and pull them in. </p>
        <TextField
          id="standard-basic"
          defaultValue={description}
          label="Description"
          multiline
          rows={7}
          variant="outlined"
          fullWidth
          type="text"
          name="username"
          onChange={handleChange}
        />
        <div className={`charCount ${charClass}`}>({charCount}/{maxChar})</div>
      </div>
      <div className="bottomNavButtons">
        <BackButton linkTo={`${path}/1`} />
        <NextButton linkTo={enableNext ? `${path}/3` : ''} disabled={!enableNext} />
      </div>
    </div>
  );
};

export default CreateQuestion2;
