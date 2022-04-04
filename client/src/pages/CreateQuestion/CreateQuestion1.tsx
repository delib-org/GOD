import React, { FC } from 'react';
import classNames from 'classnames'
// matrial UI
import TextField from '@mui/material/TextField';
import { NextButton } from "components/Wizard";
import { newQuestionSelector, setTitle, isTitleSet } from 'redux/reducers/createQuestionReducer';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion1: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const { path } = props;
  const { title } = useAppSelector(newQuestionSelector);

  const dispatch = useAppDispatch();

  function handleChange(ev: any) {
    dispatch(setTitle(ev.target.value));
  }

  const maxChar = 140;
  const charCount = title.length;
  const charClass = charCount > 6 && charCount < maxChar ? 'charCount--ok' : 'charCount--min'
  const enableNext = isTitleSet(title)

  return (
    <div>
      <div className="wrapper">
        <h1>What is the Issue / problem / question you would like to present?</h1>
        <p>This will be the title, which will appear at the top. Keep the description short and to the point.</p>
        <TextField id="standard-basic" defaultValue={title} label="Question Title" multiline rows={3} variant="outlined" fullWidth type="text" name="username" onChange={handleChange} />
        <div className={classNames("charCount", charClass)}>({charCount}/{maxChar})</div>
      </div>
      <div className="bottomNavButtons">
        <NextButton linkTo={enableNext ? `${path}/2` : ''} disabled={!enableNext} />
      </div>
    </div>
  );
};

export default CreateQuestion1;
