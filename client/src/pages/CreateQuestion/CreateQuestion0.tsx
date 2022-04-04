import React from 'react';
import Button from "components/Button";

import CreateQuestionProps from './CreateQuestionProps';

function CreateQuestion0(props: CreateQuestionProps) {
  const { path } = props;

  return (
    <div>
      <div className="wrapper">
        <h1>Create a Discussion</h1>
        <p>Asking the right question is an important aspect of a healthy discussion for ultimately agreeing, as a group on the right solution. </p>
        <div className="question">
          But how do you ask the “right question”?
        </div>
        <div className="instruction__box">
          <div className="instruction__row">
            <div className="instruction__number">1</div>
            <div className="instructions__text">When creating a question and describing your concern, please be civil. Remember there are human beings with feelings on the other side. </div>
          </div>
          <div className="instruction__row">
            <div className="instruction__number">2</div>
            <div className="instructions__text">When creating a question and describing your concern, please be civil. Remember there are human beings with feelings on the other side. </div>
          </div>
        </div>
        <div className="warnings--text">
          Once a discussion is shared, it cannot be edited.
        </div>
      </div>
      <div className="bottomNavButtons">
        <Button linkTo={`${path}/1`}>Lets Start</Button>
      </div>
    </div>
  );
}

export default CreateQuestion0;
