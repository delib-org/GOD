import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";


const Buttons: FC = () => {
  const history = useHistory();


  return (
    <>
      <div className="home__header">
        <div className='home__header__logo'>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="no one"
          ></img>
        </div>
        <div className="home__header__add">
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(204 146 58)",
            }}
            startIcon={
              <AddIcon />
            }
            onClick={() => { history.push('/create_question') }}
          >
            Create
          </Button>
        </div>
      </div>



    </>
  );
};
export default Buttons;
