import { useEffect } from "react";
import "./Vote.scss";
import { map } from "lodash";

// controls
import { calcVotes } from "utils/votes";

// model
import { useAppSelector } from "redux/hooks";
import { questionById } from "redux/reducers/questionsReducers";

// components
import VoteBar from "./VoteBar";

export interface QuestionInfoProps {
  question: any;
}

function Vote(props: QuestionInfoProps) {
  const { question } = props;

  const { votes } = useAppSelector(questionById(question._id));

  useEffect(() => {
    console.log(votes);
    if (votes) {
      const count = calcVotes(question.solutions, votes);
    }
  }, [votes]);

  try {
    return (
      <div className="votePanel">
        {map(question.solutions, (solution, i: number) => (
          <VoteBar
            key={`solution-${i}`}
            questionId={question._id}
            solution={solution}
            maxVotes={12}
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
