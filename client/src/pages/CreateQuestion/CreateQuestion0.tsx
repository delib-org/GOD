import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import {createQuestionProps} from './CreateQuestion';

function CreateQuestion0(props: createQuestionProps) {
    const { path } = props;

    return (
        <div>
            <div className="wrapper">
                <h1>Create a Discussion</h1>
                <p>Asking the right question is an important aspect of a healthy discussion for ultimately agreeing, as a group on the right solution. </p>
                <div className="question">
                    But how do you ask the “right question”?
                </div>
                <div className="instruction__box">
                    <div className="instruction__row">
                        <div className="instruction__number">1</div>
                        <div className="instructions__text">When creating a question and describing your concern, please be civil. Remember there are human beings with feelings on the other side. </div>
                    </div>
                    <div className="instruction__row">
                        <div className="instruction__number">2</div>
                        <div className="instructions__text">When creating a question and describing your concern, please be civil. Remember there are human beings with feelings on the other side. </div>
                    </div>
                </div>
                <div className="warnings--text">
                    Once a discussion is shared, it cannot be edited.
                </div>
            </div>
            <div className="bottomNavButtons">
                <Link to={`${path}/1`}>
                    <Button variant="contained">Lets Start</Button>
                </Link>
            </div>
        </div>
    );
}

export default CreateQuestion0;
