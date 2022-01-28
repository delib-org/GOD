import React, { FC } from "react";

import './VoteCard.scss';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
//models

export interface VoteCardProps {
  info: any
}

const VoteCard: FC<VoteCardProps> = (props: VoteCardProps) => {
  const { info } = props;

  console.log(info)

  return (
    <div className="card">
      <div className="card__image" style={{ backgroundImage: `url(${info.image.secure_url}` }}>
        <div className="card__title"> {info.title} </div>
        <div className="card__status"> {info.active ? "Published" : "Draft"}   </div>

      </div>
      {!info.active ?
        <div className="card__edit">
          Back to Edit
        </div>

        : <div className="card__info">

          <div className="card__info__votes">

            <i className="card__info__voteCount__icon">
              <HowToVoteIcon style={{ margin: "0 auto" }} />
            </i>

            <div>{info.__v}</div>

          </div>
          <div className="card__info__shere">Shere</div>
          <div className="card__info__views">View</div>

        </div>
      }

    </div>
  )

};
export default VoteCard;
