import React from 'react';
import { Button } from '@mui/material';
import './Information.scss';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import SolutionCard from '../../../components/SolutionCard';

export interface QuestionInfoProps {
  question: any;
}

function QuestionInfo(props: QuestionInfoProps) {
  const history = useHistory();

  const { question } = props;

  const { title, description } = question;

  return (
    <div className="question-info">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="section-title">Suggested solutions</div>
      {_.map(question.solutions, (solution, i: number) => (<SolutionCard key={`solution-${i}`} solution={solution} number={i + 1} questionId={question._id} />))}
      <div className="toolbar">
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/question/${question._id}/add-solution`);
          }}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

export default QuestionInfo;
