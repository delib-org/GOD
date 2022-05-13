import './About.scss';
import React, { FC } from 'react';
import Header from 'components/Header';
import aboutImg from 'img/home-image.png';
// material-ui styles
import { Button } from '@mui/material';

// components
import ButtonAppBar from 'components/ButtonAppBar/ButtonAppBar';

const Home: FC = () => (
  <>
    <div className="about__page">
      <Header />

      <div className="about__main">
        <h3 className="about__title">Ask. Discuss. Vote. Agree.</h3>
        <div className="about__para">Learn About The Decision-Making Tool</div>
        <div className="about__para">How It Works And How Your Vote</div>
        <div className="about__para">Can Make A Difference</div>
        <img src={aboutImg} alt="" />

        <div className="about__learnMore">
          <a href="https://www.globalonlinedemocracy.org/" target="_blank" rel="noreferrer">
            <Button
              variant="outlined"
              style={{ color: '#34aef0' }}
            >
              Learn More
            </Button>
          </a>
        </div>
      </div>

    </div>
    <ButtonAppBar />
  </>
);
export default Home;
