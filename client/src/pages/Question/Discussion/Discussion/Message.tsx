import React, { useState } from "react";
import { get } from "lodash";
import TruncateMarkup from 'react-truncate-markup';
import Parser from 'html-react-parser';
import './Message.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';

interface MessageProps {
  msg: any,
  isPreview?: boolean,
}

const Message = (props: MessageProps) => {
  const { msg, isPreview, } = props;
  const [truncate, setTruncate] = useState(!isPreview);

  const displayName = get(msg, "roles.creator.displayName", "");
  if (displayName.length === 0) {
    console.warn(`message ${msg._id} has no creator`);
    console.log(JSON.stringify(msg));
  }

  function elapsedTime(date: any){
    //convert to unix the message timestamp
    const myDate = new Date(date)
    const timestamp = myDate.getTime()
    const secondsOld = Math.floor(timestamp / 1000)

    //get the time now
    const timeNow = new Date()
    const recentTimeTimestamp = timeNow.getTime()
    const secondsNow = Math.floor(recentTimeTimestamp / 1000)

    const difference = secondsNow - secondsOld

    if (difference < 60) {
      return `${difference} seconds ago`
    } if (difference < 3600) {
      // Less than an hour has passed:
      return `${Math.floor(difference / 60)} minutes ago`;
    } if (difference < 86400) {
      // Less than a day has passed:
      return `${Math.floor(difference / 3600)} hours ago`;
    } if (difference < 2620800) {
      // Less than a month has passed:
      return `${Math.floor(difference / 86400)} days ago`;
    } if (difference < 31449600) {
      // Less than a year has passed:
      return `${Math.floor(difference / 2620800)} months ago`;
    }
    // More than a year has passed:
    return `${Math.floor(difference / 31449600)} years ago`;
  }

  try {
    return (
      <div className="message">
        <div className="avatar">
          <Avatar sx={{ width: 28, height: 28 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div className="message-container">
          <div className="creator">
            {displayName} - {elapsedTime(msg.date)}
          </div>
          {truncate ? (
            <TruncateMarkup lines={6} ellipsis={<span onClick={() => setTruncate(!truncate)} className="message-truncate"> ... Read more</span>}>
              <div className="content">{Parser(msg.text)}</div>
            </TruncateMarkup>
          ) : (
            <div>
              {!isPreview && (
              <div className="content">{Parser(msg.text)}
                <span onClick={() => setTruncate(!truncate)} className="message-truncate"> Show less</span>
              </div>
              )}
            </div>
          )
          }
          <div className="bottom-nav-buttons">
            <div className="bottom-buttons-left">
              <div>
                <ThumbUpIcon />
                <div className="upvote">0</div>
              </div>
              <div>
                <ThumbDownIcon />
                <div className="downvote">0</div>
              </div>
              <div>
                <ReplyIcon />
              </div>
            </div>
            <div className="bottom--buttons-right">
              <MoreVertIcon />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(msg);
    console.error(error);
    return null;
  }
};

export default Message;
