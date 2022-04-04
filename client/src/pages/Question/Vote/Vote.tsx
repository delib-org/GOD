import React from "react";
import "./Vote.scss";
import { map } from "lodash";
import SolutionCard from "components/SolutionCard";

export interface QuestionInfoProps {
  question: any;
}

function Vote(props: QuestionInfoProps) {
  const { question } = props;
  try {
    return (
      <div className="vote-tab">
        {map(question.solutions, (solution, i: number) => (
          <SolutionCard
            key={`solution-${i}`}
            solution={solution}
            number={i + 1}
            questionId={question.id}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default Vote;
