interface VoteBarProps {
  solution: any;
  maxVotes: number;
}

const VoteBar = (props: VoteBarProps) => {
  const { solution } = props;

  try {
    const { title } = solution;
    // const votesPercentage = `${(votesNumber/ maxVotes)*100}%`
    return (
      <div className="voteBar">
        <div className="voteBar__i">i</div>
        <div className="voteBar__bar" style={{ height: "45%" }} />
        <div className="voteBar__button">{title}</div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default VoteBar;
