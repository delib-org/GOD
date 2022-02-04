import React, { FC, useState, useEffect } from "react";
import io from "socket.io-client";
import {useParams} from 'react-router-dom';
import { Tabs, Tab } from "@mui/material";
import './Question.scss';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Question.scss";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

//redux
import { addMessage } from "../../../redux/reducers/chatReducer";
import {allMessages} from '../../../redux/reducers/chatReducer';

//interfaces
import { Message } from "../../../redux/reducers/chatReducer";

//components
import Discussion from "./Discussion/Discussion";

export interface QuestionProps {
  info?: any;
}

interface QuestionParams{
  questionId:string
}

const socket = io();

const Question: FC<QuestionProps> = (props: QuestionProps) => {

  const params = useParams<QuestionParams>();
  console.log(params)
  let questionId = '';
  if('questionId' in params){
    questionId = params.questionId
  }

  const dispatch = useAppDispatch();
  const messages = useAppSelector(allMessages).filter(msg=>msg.parentId === questionId);

  useEffect(() => {
   //listen to messges
    socket.on("message", (msg:Message) => {
      console.log("message", msg);
      if (msg) {
        dispatch(addMessage(msg));
      }
    });

    return ()=>{
      socket.removeAllListeners("message");
    }
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <div className="TabsWrapper">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          style={{
            width: "100%",
          }}
          value={selectedTab}
          onChange={hendelTapTab}
          TabIndicatorProps={{
            style: { backgroundColor: "#21DCA2" },
          }}>
          <Tab
            style={{
              width: "33%",
            }}
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Question & Solutions
              </span>
            }
          />
          <Tab
            style={{
              width: "33%",
            }}
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Discussion
              </span>
            }
          />
          <Tab
            style={{
              width: "33%",
            }}
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Vote
              </span>
            }
          />
        </Tabs>
      </div>
      <div className="voteListWrapper">
        {selectedTab === 0 && (
          <div>
            <h2>Question and solutions</h2>
          </div>
        )}

        {selectedTab === 1 && <div><Discussion questionId={questionId} messages={messages}/></div>}

        {selectedTab === 2 && 
        <div>
          <h2>Votes</h2>
          </div>}
      </div>
      
      <div className="bottom-nav">
        <Link to="/questions" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            <ArrowBackIosIcon/>Back
          </Button>
        </Link>
      </div>
    </>
  );
};
export default Question;
