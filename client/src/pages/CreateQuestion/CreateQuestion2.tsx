import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  selectDescription,
  selectEnableMoveTo3,
  setDescription,
  setEnableMoveTo3
} from '../../redux/reducers/createQuestionReducer';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createQuestionProps } from './CreateQuestion';

const CreateQuestion2: FC<createQuestionProps> = (props: createQuestionProps) => {

  const description = useAppSelector(selectDescription);
  const enableNext = useAppSelector(selectEnableMoveTo3);
  const dispatch = useAppDispatch();
  let { path } = props;

  //state
  const maxChar = 500;
  const [charCount, setCharCount] = useState(description.length);
  const [charClass, setCharClass] = useState('charCount--min');

  return (
    <div>
      <div className="wrapper">
        <h1>Why is this important?</h1>
        <p>This is your call to action, the place to describe the issue and emphasize the importance of participating and voting in this discussion. This is your opportunity to interest the group and pull them in. </p>
        < TextField
          id="standard-basic"
          defaultValue={description}
          label="Description"
          multiline rows={7}
          variant="outlined"
          fullWidth
          type="text"
          name='username'
          onChange={handleChange} />
          <div className={`charCount ${charClass}`}>({charCount}/{maxChar})</div>
      </div>
      <div className="bottomNavButtons">
      
        <Link to={`${path}/1`}>
          <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>Back</Button>
        </Link>
        {enableNext?
        <Link to={`${path}/3`}>
          <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button>
        </Link>
        :
        <Button variant="contained" endIcon={<ArrowForwardIosIcon />} disabled={true}>Next</Button>
}
      </div>
    </div>
  );

  function handleChange(ev: any) {
    const charCountVar = ev.target.value.length;
    setCharCount(ev.target.value.length);

    if (charCountVar > 6 && charCountVar < maxChar) {
      setCharClass('charCount--ok');
      dispatch(setDescription(ev.target.value));
      dispatch(setEnableMoveTo3(true))
    } else if (charCountVar <= 6) {
      setCharClass('charCount--min');
      dispatch(setEnableMoveTo3(false))
    } else {
      
      ev.target.value = ev.target.value.slice(0, -1);
    }


  }
}

export default CreateQuestion2;