import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import checkCircleIcon from "img/check-circle.svg"
import Button from "../../components/Button";
import SVG from "../../components/SVG";

const CreateQuestionSuccess: FC = () => (
  <div className="page create-question-success">
    <div className="wrapper">
      <div className="main-icon">
        <SVG src={checkCircleIcon} />
      </div>
      <h1>Your Question is Published!</h1>
      <br />
      <br />
      <h2>One Last Thing..</h2>
      <p>
        Spread the word by inviting people to
        discuss and vote your important cause!
      </p>
      <Button className="share-button">Share</Button>
      <div>Or</div>
      <Link to="/questions" className="secondary">
        <Button className="secondary">Go To Questions</Button>
      </Link>
    </div>
  </div>
)

export default CreateQuestionSuccess;
