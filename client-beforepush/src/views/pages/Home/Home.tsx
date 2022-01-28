import React, { FC } from "react";
import Buttons from "../.././components/Buttons/Buttons";

//material-ui styles
import { Button } from "@mui/material";

const Home: FC = () => {


  return (
    <div className="home__page">
      <Buttons />

      <div className="home__main">
        <h3 className="home__title">Ask. Discuss. Vote. Agree.</h3>
        <div className="home__para">Learn About The Decision-Making Tool</div>
        <div className="home__para">How It Works And How Your Vote</div>
        <div className="home__para">Can Make A Difference</div>

        <img
          className="home-img"
          src={process.env.PUBLIC_URL + "/home-image.png"}
          width="100%"
          alt="no one"
        ></img>

        <div className="home__learnMore">
          <Button
            variant="outlined"
            style={{ color: "#34aef0" }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Home;
