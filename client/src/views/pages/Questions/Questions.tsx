import React, { FC, useState, useEffect } from "react";
import axios from 'axios';
import { Tabs, Tab } from "@mui/material";
import VoteCard from "../../components/QuestionCard/QuestionCard";
import Buttons from "../../components/Header/Header";

//redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getQuestionsThunk,
  allQuestions,
  newestQuestionTime
} from "../../../redux/reducers/questionsReducers";
import { getUserThunkReducer } from "../../../redux/reducers/userRducer";

//components
import ButtonAppBar from "../../components/ButtonAppBar/ButtonAppBar";

export interface Group {
  status: string;
  votes: number;
  title: string;
  questionId: string;
}

const Vote: FC = () => {
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const questions = useAppSelector(allQuestions);
  const date_created = useAppSelector(newestQuestionTime);
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (!questions.length) {
      dispatch(getQuestionsThunk());
    } else {
      //get new update
      
    }
    dispatch(getUserThunkReducer());

    //testing
    axios.post('/questions/get-new',{user:103057690092925211364, date_created})
    .then(({data})=>{
      console.log(data.result)
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Buttons />

      <div className="TabsWrapper">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={selectedTab}
          onChange={hendelTapTab}
          TabIndicatorProps={{
            style: {
              backgroundColor: "gray",
            },
          }}>
          <Tab label={<span>My Questions</span>} />
          <Tab
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Ongoing
              </span>
            }
          />
          <Tab
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Pending
              </span>
            }
          />
          <Tab
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Past
              </span>
            }
          />
        </Tabs>
      </div>
      <div className="voteListWrapper">
        {selectedTab === 0 && (
          <div className="voteList">
            {questions.map((item, i) => (
              <VoteCard key={i} info={item} />
            ))}
          </div>
        )}

        {selectedTab === 1 && (
          <div className="voteList">
            {questions
              .filter((item: any) => item.active)
              .map((item, i) => (
                <VoteCard key={i} info={item} />
              ))}
          </div>
        )}

        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}

        {selectedTab === 3 && (
          <div className="voteList">
            {questions
              .filter((item: any) => !item.active)
              .map((item, i) => (
                <VoteCard key={i} info={item} />
              ))}
          </div>
        )}
      </div>
      <ButtonAppBar />
    </>
  );
};
export default Vote;
