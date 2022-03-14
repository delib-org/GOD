import React from "react";
import "./Vote.scss";
import { map } from "lodash";

import VoteBar from "./VoteBar";

export interface QuestionInfoProps {
  question: any;
}

function Vote(props: QuestionInfoProps) {
  const { question } = props;
  console.log(question.solutions);
  try {
    return (
      <div className="votePanel">
        {map(question.solutions, (solution, i: number) => (
          <VoteBar key={`solution-${i}`} solution={solution} maxVotes={12} />
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default Vote;
