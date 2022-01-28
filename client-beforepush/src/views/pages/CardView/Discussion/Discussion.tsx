import React, { FC, useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from 'axios';

const Discussion: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [questions, setQuestions] = useState([]);
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    axios.post('/questions/get-all', {})
      .then(({ data }) => {
        console.log(data.result);
        setQuestions(data.result);
      }).catch(e => {
        console.error(e)
      })
  }, [])


  return (
    <>

      <div className="TabsWrapper">
        <Tabs variant="scrollable" scrollButtons="auto"
          value={selectedTab} onChange={hendelTapTab} TabIndicatorProps={{
            style: {
              backgroundColor: "#21DCA2",

            }
          }} >
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>My Questions</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Ongoing</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Pending</span>} />

        </Tabs>

      </div >
      <div className="voteListWrapper">

        {selectedTab === 0 && <div className="voteList">
          
        </div>}

        {selectedTab === 1 && <div className="voteList">
      
        </div>}

        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}

   

      </div>

    </>
  );
};
export default Discussion;
