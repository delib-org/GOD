import React, { FC, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useLocation,
  Link,
} from "react-router-dom";
import Tabs from "components/Tabs";
import "./Question.scss";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
// controlers
import { uid, getLastParamsFromURL } from "utils/helpers";
import { sendMessage, joinRoom, leaveRoom } from "utils/socket";
// redux
import { addMessage, Message } from "redux/reducers/chatReducer";
import { questionById, toggleWatch } from "redux/reducers/questionsReducers";
import { User, userSelector } from "redux/reducers/userReducer";
import { useAppSelector, useAppDispatch } from "redux/hooks";
// components
import InternalHeader from "components/InternalHeader";
import _ from "lodash";
import classNames from "classnames";
import Discussion from "./Discussion";
import QuestionInfo from "./Information";
import Vote from "./Vote/Vote";

interface QuestionParams {
  questionId: string;
}

const Question: FC = () => {
  const params = useParams<QuestionParams>();
  const location = useLocation();
  const { path, url } = useRouteMatch();
  const user: User = useAppSelector(userSelector);
  const [subLocation, setSubLocation] = useState<string | boolean>("");

  let questionId = "";
  if ("questionId" in params) {
    questionId = params.questionId;
  }

  const dispatch = useAppDispatch();
  const question = useAppSelector(questionById(questionId));
  const isWatching = _.get(question, ['watchlist', user.id], false)

  useEffect(() => {
    joinRoom(questionId, (messageObj: any) => {
      dispatch(addMessage(messageObj));
    });

    return () => {
      leaveRoom(questionId);
    };
  }, []);

  useEffect(() => {
    if (getLastParamsFromURL(location) === "discussion") {
      setSubLocation("discussion");
    } else {
      setSubLocation(false);
    }
  }, [location]);

  const imageUrl = question.image?.secure_url;

  const formatMessage = (message: string): Message | null => {
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
      return null;
    }
  };

  const handleSendMessage = (ev: any) => {
    ev.preventDefault();
    const message: string = ev.target.elements.message.value;

    if (message) {
      const msg = formatMessage(message);
      if (msg) {
        dispatch(addMessage(msg));
        sendMessage(msg);
        // tempMessageId = msg.id;
      }
    }
  };

  return (
    <div className="page page-question">
      <InternalHeader backUrl="/questions">
        <ShareIcon />
        <VisibilityIcon
          onClick={() => dispatch(toggleWatch(questionId, user.id))}
          className={classNames({ on: isWatching, off: !isWatching })} />
      </InternalHeader>
      <div className="question-header" style={{ backgroundImage: imageUrl ? `url(${imageUrl}` : "none" }} />
      <Tabs
        id="questions"
        isMenu
        tabs={[
          { title: "Solutions", link: `${url}` },
          { title: "Discussion", link: `${url}/discussion` },
          { title: "Vote", link: `${url}/vote` },
        ]}
      />
      <div className="internal-page">
        <Switch>
          <Route path={`${path}/discussion`}>
            <Discussion questionId={questionId} />
          </Route>
          <Route path={`${path}/vote`}>
            <Vote question={question} />
          </Route>
          <Route path={`${path}/info`}>
            <QuestionInfo question={question} />
          </Route>
          <Redirect to={`${path}/info`} />
        </Switch>
      </div>
      <div className="bottom-bar">
        {subLocation === "discussion" ? (
          <form onSubmit={handleSendMessage} className="bottom-bar__input">
            <input
              type="text"
              name="message"
              autoComplete="off"
              placeholder="add message"
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        ) : null}
        {/*<div*/}
        {/*  className="bottom-nav"*/}
        {/*  style={{*/}
        {/*    boxShadow:*/}
        {/*      subLocation === "discussion" ? "none" : "0 12px 8px 10px grey",*/}
        {/*  }}>*/}
        {/*  <Link to="/questions" style={{ textDecoration: "none" }}>*/}
        {/*    <Button>*/}
        {/*      <ArrowBackIcon />*/}
        {/*    </Button>*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
export default Question;
