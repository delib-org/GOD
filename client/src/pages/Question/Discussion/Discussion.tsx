import React, { FC, useState, useEffect } from "react";
import './Discussion.scss'
import _ from 'lodash'
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { uid } from "utils/helpers";
import {Message, addMessage, allMessages, getDiscussionThunk} from "redux/reducers/chatReducer";
import {sendMessage} from "utils/socket";
import {User, userSelector} from "redux/reducers/userReducer";
import SendIcon from '@mui/icons-material/Send';

interface DiscussionProps {
  questionId: string;
  messages: Array<Message>;
}

let tempMessageId: string | boolean = false;

const Discussion: FC<DiscussionProps> = (props: DiscussionProps) => {
  const { questionId } = props;

  const dispatch = useAppDispatch();

  const user: User = useAppSelector(userSelector)
  const messages: Message[] = useAppSelector(allMessages)

  useEffect(() => {
    dispatch(getDiscussionThunk(questionId))
  }, [])

  function handleSendMessage(ev: any) {
    ev.preventDefault();
    const message: string = ev.target.elements.message.value;

    if (message) {
      const msg = formatMessage(message);
      if (!!msg) {
        // dispatch(addMessage(msg));
        sendMessage(msg)
        tempMessageId = msg.id;
      }
    }
  }

  function formatMessage(message: string): Message | null {
    try {
      return {
        // messageId,
        id: uid(),
        text: message,
        creatorId: user.id,
        creatorDisplayName: user.displayName,
        parentId: questionId,
        parentType: "question",
        error: false,
      };
    } catch (err) {
      console.error(err);
      return null
    }
  }

  return (
      <div className="chat">
        <div className="messages">
          {_.map(messages, (msg: any, i: number) => (
              <div key={`message-${i}`} className="message">
                <div className="creator">{msg.roles.creator.displayName} - {msg.date}</div>
                <div className="content">{msg.text}</div>
              </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="chat-input">
            <input type="text" name="message" autoComplete="off" placeholder="add message" />
            <button type="submit">
              <SendIcon/>
            </button>
          </div>
        </form>
      </div>
  )
}

export default Discussion
