import React, { FC } from 'react';
import { capitalize } from 'lodash'
import { useHistory } from 'react-router-dom';
import './QuestionCard.scss';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { useAppDispatch } from "redux/hooks";
import PublishAlert from "popups/PublishAlert";
import { publishQuestion } from "redux/reducers/questionsReducers";

export interface VoteCardProps {
  question: any
}

const VoteCard: FC<VoteCardProps> = (props: VoteCardProps) => {
  const { question } = props;
  const { _id: questionId, image, title, status } = question

  const history = useHistory();
  const dispatch = useAppDispatch()

  const [publishPopupOpen, setPublishPopupOpen] = React.useState(false);

  function handleRedirect() {
    if (status !== 'draft') {
      history.push(`/question/${questionId}`);
    }
    // todo - load question to newQuestion and redirect to /1
  }

  const publish = () => dispatch(publishQuestion(questionId, () => setPublishPopupOpen(false)))

  const imageUrl = image?.secure_url;

  return (
    <div className="card">
      <div
        className="card__image"
        style={{ backgroundImage: imageUrl ? `url(${imageUrl}` : 'none' }}
        onClick={handleRedirect}
      >
        <div className="card__title">{title}</div>
        <div className="card__status">{capitalize(status)}</div>
      </div>
      <div className="card__info">
        {status !== 'draft' ? (
          <>
            <div className="card__info__votes">
              <i className="card__info__voteCount__icon">
                <HowToVoteIcon style={{ margin: '0 auto' }} />
              </i>
              {/* eslint-disable-next-line no-underscore-dangle */}
              <div>0</div>
            </div>
            <div className="card__info__share">Share</div>
            <div className="card__info__views" onClick={handleRedirect}>View</div>
          </>
        ) : (
          <>
            <div className="card__info__votes">Edit</div>
            <div className="card__info__share">Ask for Review</div>
            <div className="card__info__views" onClick={() => setPublishPopupOpen(true)}>Publish</div>
          </>
        )}
      </div>
      <PublishAlert isOpen={publishPopupOpen} close={() => setPublishPopupOpen(false)} publish={publish} />
    </div>
  );
};
export default VoteCard;
