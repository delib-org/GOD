import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

//redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  selectTitle,
  selectEnableMoveTo2,
  setTitle,
  setEnableMoveTo2
} from '../../redux/reducers/createQuestionReducer';

//matrial UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { createQuestionProps } from './CreateQuestion';


const CreateQuestion1: FC<createQuestionProps> = (props: createQuestionProps) => {

  const title = useAppSelector(selectTitle);
  const enableNext = useAppSelector(selectEnableMoveTo2);
  const dispatch = useAppDispatch();
  const { path } = props;

  //state
  const maxChar = 140;
  const [charCount, setCharCount] = useState(title.length);
  const [charClass, setCharClass] = useState('charCount--min');
  

  return (
    <div>
      <div className="wrapper">
        <h1>What is the Issue / problem / question you would like to present?</h1>
        <p>This will be the title, which will appear at the top. Keep the description short and to the point.</p>
        < TextField id="standard-basic" defaultValue={title} label="Question Title" multiline rows={3} variant="outlined" fullWidth type="text" name='username' onChange={handleChange} />
        <div className={`charCount ${charClass}`}>({charCount}/{maxChar})</div>
      </div>
      <div className="bottomNavButtons">
        {enableNext ?
          <Link to={`${path}/2`}>
            <Button variant="contained" endIcon={<ArrowForwardIosIcon />} >Next</Button>
          </Link>
          : <Button variant="contained" endIcon={<ArrowForwardIosIcon />} disabled={true}>Next</Button>
        }
      </div>
    </div>
  );


  function handleChange(ev: any) {
    const charCountVar = ev.target.value.length;
    setCharCount(ev.target.value.length);

    if (charCountVar > 6 && charCountVar < maxChar) {
      setCharClass('charCount--ok');
      dispatch(setTitle(ev.target.value));
      dispatch(setEnableMoveTo2(true))
    } else if (charCountVar <= 6) {
      setCharClass('charCount--min');
      dispatch(setEnableMoveTo2(false))
    } else {
      // setCharClass('charCount--max');
      ev.target.value = ev.target.value.slice(0, -1);
    }


  }
}

export default CreateQuestion1;