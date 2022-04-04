import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import { NextButton, BackButton } from "components/Wizard";
import { isDescriptionSet, newQuestionSelector, setDescription } from 'redux/reducers/createQuestionReducer';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion2: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const { path } = props;
  const { description } = useAppSelector(newQuestionSelector);

  const dispatch = useAppDispatch();

  function handleChange(ev: any) {
    dispatch(setDescription(ev.target.value));
  }

  const maxChar = 500;
  const charCount = description.length;
  const charClass = charCount > 6 && charCount < maxChar ? 'charCount--ok' : 'charCount--min'
  const enableNext = isDescriptionSet(description)

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
