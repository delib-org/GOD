import React, { FC, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useRouteMatch, useHistory
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { clear, newQuestionSelector } from "redux/reducers/createQuestionReducer";
import { upsertQuestion } from "redux/reducers/questionsReducers";
import InternalHeader from "components/InternalHeader";
import { WizardSteps } from "components/Wizard";
import CreateQuestion0 from './CreateQuestion0';
import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';
import CreateQuestion5 from './CreateQuestion5';

const CreateQuestion: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch()
  const newQuestion = useAppSelector(newQuestionSelector)
  const { path } = useRouteMatch();
  const { pathname } = useLocation()

  const wizardSteps = [
    { stepNumber: 1, caption: 'Problem' },
    { stepNumber: 2, caption: 'Goal' },
    { stepNumber: 3, caption: 'Upload' },
    { stepNumber: 4, caption: 'Schedule' },
    { stepNumber: 5, caption: 'Review' },
  ];

  const hasStarted = pathname !== '/create_question'

  useEffect(() => { // eslint-disable-line
    return () => {
      dispatch(clear())
    }
  }, [])

  const saveAndExit = () => dispatch(upsertQuestion(newQuestion, () => history.push("/questions")))

  return (
    <div className="page create-question">
      <InternalHeader title="Create Question" backUrl="/questions">
        {hasStarted && (<span onClick={saveAndExit}>Save & Exit</span>)}
      </InternalHeader>
      <WizardSteps steps={wizardSteps} isVisible={hasStarted} />
      <Switch>
        <Route exact path={path}>
          <CreateQuestion0 path={path} />
        </Route>
        <Route exact path={`${path}/1`}>
          <CreateQuestion1 path={path} />
        </Route>
        <Route exact path={`${path}/2`}>
          <CreateQuestion2 path={path} />
        </Route>
        <Route exact path={`${path}/3`}>
          <CreateQuestion3 path={path} />
        </Route>
        <Route exact path={`${path}/4`}>
          <CreateQuestion4 path={path} />
        </Route>
        <Route exact path={`${path}/5`}>
          <CreateQuestion5 path={path} />
        </Route>
      </Switch>
    </div>
  );
};

export default CreateQuestion;
