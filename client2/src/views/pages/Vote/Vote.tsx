import React, { FC, useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import VoteCard from "../../components/VoteCard/VoteCard";
import axios from 'axios';
import Buttons from "../../components/Buttons/Buttons";


//redux
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getQuestionsThunk, allQuestions } from '../../../redux/reducers/questionsReducers';

// const useStyles = makeStyles({
//   div: {
//     color: "blue",

//   }
// });


export interface Group {
  status: string;
  votes: number;
  title: string;
  questionId: string;
}

const Vote: FC = () => {
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const questions = useAppSelector(allQuestions)
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {

    dispatch(getQuestionsThunk());
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <Buttons />

      <div className="TabsWrapper">
      
        <Tabs variant="scrollable"
          scrollButtons="auto"
          value={selectedTab}
          onChange={hendelTapTab}
          TabIndicatorProps={{
            style: {
              backgroundColor: "gray",

            }
          }} >
          <Tab label={<span>My Questions</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Ongoing</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Pending</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Past</span>} />

        </Tabs>

      </div >
      <div className="voteListWrapper">

        {selectedTab === 0 && <div className="voteList">
          {questions.map((item, i) => <VoteCard key={i} info={item} />)}
        </div>}

        {selectedTab === 1 && <div className="voteList">
          {questions.filter((item: any) => item.active).map((item, i) => <VoteCard key={i} info={item} />)}
        </div>}

        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}

        {selectedTab === 3 && <div className="voteList">
          {questions.filter((item: any) => !item.active).map((item, i) => <VoteCard key={i} info={item} />)}
        </div>}

      </div>

    </>
  );
};
export default Vote;
