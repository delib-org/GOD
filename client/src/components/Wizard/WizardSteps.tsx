import React, { FC } from 'react';
import classNames from "classnames";
import { useAppSelector } from "redux/hooks";
import { stepEnabledSelector } from "redux/reducers/createQuestionReducer";
import useWizardRoute from "hooks/useWizardRoute";
import { useRouteMatch } from "react-router";
import { Link } from 'react-router-dom'

interface StepProps {
  stepNumber:number;
  caption: string;
}

export interface WizardStepsProps {
  steps: Array<StepProps>;
  isVisible?: boolean;
}

const Step: FC<StepProps> = (props:StepProps) => {
  const { stepNumber, caption } = props;
  const { path: basePath } = useRouteMatch();
  const pageFromUrl = useWizardRoute()
  const stepEnabled = useAppSelector(stepEnabledSelector(pageFromUrl, stepNumber))
  const isCurrent = stepNumber === pageFromUrl
  const isClickable = !isCurrent && stepEnabled

  const classes = {
    'indicator--complete': stepNumber < pageFromUrl,
    'indicator--current': isCurrent,
    'indicator--disabled': !stepEnabled,
  }

  const renderStep = () => (
    <div className={classNames('indicator-step', classes)}>
      <div>{stepNumber}</div>
      <div className="indicator-label">{caption}</div>
    </div>
  )

  return isClickable ? (
    <Link key={`wizard-step-${stepNumber}`} to={`${basePath}/${stepNumber}`}>
      {renderStep()}
    </Link>
  ) : renderStep()
}

export const WizardSteps: FC<WizardStepsProps> = (props:WizardStepsProps) => {
  const { steps, isVisible } = props;

  return isVisible ? (
    <div className="indicator">
      <div className="indicator-internal">
        <hr />
        {steps.map((step) => <Step key={`wizard-step-${step.stepNumber}`} {...step} />)}
      </div>
    </div>
  ) : null;
};

export default WizardSteps;
