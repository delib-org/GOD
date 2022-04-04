import React, { FC, useState } from 'react';
import { NextButton, BackButton } from "components/Wizard";
import { useAppDispatch } from 'redux/hooks';
import { setEndScedule, removeScedules, setStartScedule, setVoteEndScedule } from 'redux/reducers/createQuestionReducer';
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion4: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState(true);
  const [scheduleCount, setScheduleCount] = useState(0);
  const { path } = props;
  const dateControl: any = document.querySelectorAll('input[type="date"]');
  const handleSet = () => {
    if (disable === false) {
      setDisable(true);
      if (dateControl != null) {
        dateControl[0].value = '';
        dateControl[1].value = '';
        dateControl[2].value = '';
      }
      dispatch(removeScedules());
    } else if (disable === true) {
      setDisable(false);
      setScheduleCount(0);
    }
  }
  const handleChange = (ev: any) => {
    if (ev.target.id === "starttime") {
      dispatch(setStartScedule(ev.target.value));
      if (scheduleCount === 0) {
        setScheduleCount(1);
      }
    }
    if (ev.target.id === "suggestEnd") {
      dispatch(setEndScedule(ev.target.value));
      if (scheduleCount === 1) {
        setScheduleCount(2);
      }
    }
    if (ev.target.id === "voteEnd") {
      dispatch(setVoteEndScedule(ev.target.value));
      if (scheduleCount === 2) {
        setScheduleCount(3);
      }
    }
    if (scheduleCount === 2) {
      // dispatch(setEnableMoveTo5(true))
    }
  }
  return (
    <div>
      <div className="wrapper">
        <h1>Set a Schedule (optional)</h1>
        <p>set the times for the discussion </p>
        <label htmlFor="switch" className="switch">
          <input type="checkbox" onClick={handleSet} />
          <span className="slider round"> </span>

        </label>
        <p>use dead-lines for the question</p>
        <input type="date" id="starttime" name="starttime" onChange={handleChange} disabled={disable} />
        <hr />
        <input type="date" id="suggestEnd" name="suggestEnd" onChange={handleChange} disabled={disable} />
        <hr />
        <input type="date" id="voteEnd" name="voteEnd" onChange={handleChange} disabled={disable} />
      </div>
      <div className="bottomNavButtons">
        <BackButton linkTo={`${path}/3`} />
        <NextButton linkTo={`${path}/5`} />
      </div>
    </div>
  );
};

export default CreateQuestion4;
