import React, { FC, useEffect } from "react";
import "./Discussion.scss";
import { map } from "lodash";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  Message,
  allMessages,
  getDiscussionThunk,
} from "redux/reducers/chatReducer";

// import { User, userSelector } from 'redux/reducers/userReducer';
// import SendIcon from '@mui/icons-material/Send';

// components
import MessageComp from "./Discussion/Message";

interface DiscussionProps {
  questionId: string;
}

// let tempMessageId: string | boolean = false;

const Discussion: FC<DiscussionProps> = (props: DiscussionProps) => {
  const { questionId } = props;

  const dispatch = useAppDispatch();

  const messages: Message[] = useAppSelector(allMessages);

  useEffect(() => {
    dispatch(getDiscussionThunk(questionId));
  }, []);

  try {
    return (
      <div className="chat">
        <div className="guideline">
          <p>Remember to keep the discussion respectful and to follow the <a href="https://">Community Guidelines</a></p>

        </div>
        <div className="messages">
          {map(messages, (msg: any, i: number) => (
            <MessageComp key={`${i}-message`} msg={msg} />
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return <h1>Discusion page error</h1>;
  }
};

export default Discussion;
