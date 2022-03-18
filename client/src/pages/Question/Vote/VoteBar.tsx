import { sendVote } from "utils/socket";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { User, userSelector } from "redux/reducers/userReducer";
import { voteSolution, Vote } from "redux/reducers/questionsReducers";

interface VoteBarProps {
  solution: any;
  maxVotes: number;
  questionId: string;
}

const VoteBar = (props: VoteBarProps) => {
  const { questionId, solution } = props;
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(userSelector);

  const handleVote = () => {
    // sendVote({ solutions, solutionId: solution._id, userId: user.id });
    console.log("solution._id:", solution._id);
    dispatch(
      voteSolution({ questionId, solutionId: solution._id, userId: user.id })
    );
  };

  try {
    const { title } = solution;
    // const votesPercentage = `${(votesNumber/ maxVotes)*100}%`
    return (
      <div className="voteBar">
        <div className="voteBar__top">
          <div className="voteBar__top__i">i</div>
          <div className="voteBar__top__bar" style={{ height: "45%" }} />
        </div>
        <div className="voteBar__button" onClick={handleVote}>
          {title}
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default VoteBar;
