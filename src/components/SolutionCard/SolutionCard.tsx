import React, { useState } from 'react';
import { Solution } from 'types';
import './SolutionCard.scss';
import { arrowCircle, arrowCircleActive } from 'img/icons';
import SVG from 'components/SVG';
import TruncateMarkup from 'react-truncate-markup';
import Parser from 'html-react-parser';
import _ from 'lodash';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { likeSolution } from '../../redux/reducers/questionsReducers';
import { userSelector } from '../../redux/reducers/userReducer';

interface SolutionCardProps {
  solution: Solution,
  number: number,
  questionId: string,
  isPreview?: boolean,
}

function SolutionCard(props: SolutionCardProps) {
  const {
    solution, number, questionId, isPreview,
  } = props;

  const dispatch = useAppDispatch();
  const [truncate, setTruncate] = useState(!isPreview);
  const { id: userId } = useAppSelector(userSelector);

  const userVote = _.get(solution, ['likes', userId]);
  // todo - memoize this:
  const { true: upvotes = 0, false: downvotes = 0 } = _.countBy(solution.likes, _.identity);

  const vote = (v: boolean) => solution._id !== undefined && dispatch(likeSolution(questionId, solution._id, userId, v));

  return (
    <div className="solution-card">
      <div className="card-top">
        <div className="solution-title">{`${number > -1 ? `#${number} ` : ''} ${solution.title}`}</div>
        {truncate ? (
          <TruncateMarkup lines={7} ellipsis={<div onClick={() => setTruncate(!truncate)} className="ellipsis">Show more</div>}>
            <div>{Parser(solution.description)}</div>
          </TruncateMarkup>
        ) : (
          <>
            <div>{Parser(solution.description)}</div>
            {!isPreview && (
            <div onClick={() => setTruncate(!truncate)} className="ellipsis">Show less</div>
            )}
          </>
        )}
      </div>
      {!isPreview && (
      <div className="card-bottom">
        <div className="center-aligned-row">
          <SVG src={userVote === true ? arrowCircleActive : arrowCircle} className={classNames({ active: userVote === true })} onClick={() => vote(true)} />
          <span className="number">{upvotes}</span>
        </div>
        <div className="center-aligned-row">
          <span className="number">{`${downvotes > 0 ? '-' : ''}${downvotes}`}</span>
          <SVG src={userVote === false ? arrowCircleActive : arrowCircle} className={classNames('rotate', { active: userVote === false })} onClick={() => vote(false)} />
        </div>
      </div>
      )}
    </div>
  );
}

export default SolutionCard;
