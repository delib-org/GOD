import React, { FC } from 'react';
import {
  useLocation,
  // useRouteMatch
} from 'react-router-dom';
import classNames from "classnames";

interface StepProps {
  routeName:string;
  caption: string;
}

export interface WizardStepsProps {
  steps: Array<StepProps>;
  isVisible?: boolean;
}

export const WizardSteps: FC<WizardStepsProps> = (props:WizardStepsProps) => {
  const { steps, isVisible } = props;
  // const { path: basePath } = useRouteMatch();
  const { pathname } = useLocation()
  const urlSplit = pathname.split('/');
  const pageFromUrl = urlSplit[urlSplit.length - 1];

  return isVisible ? (
    <div className="indicator">
      <div className="indicator-internal">
        <hr />
        {steps.map(({ routeName, caption }, i) => {
          const classes = {
            'indicator--complete': parseInt(routeName, 10) < parseInt(pageFromUrl, 10),
            'indicator--current': routeName === pageFromUrl,
            'indicator--disabled': parseInt(routeName, 10) > parseInt(pageFromUrl, 10),
          }
          return (
            <div key={`wizard-step-${routeName}`} className={classNames('indicator-step', classes)}>
              <div>{i + 1}</div>
              <div className="indicator-label">{caption}</div>
            </div>
          )
          // return (
          //   <Link key={`page-${routeName}`} to={`${basePath}/${routeName}`}>
          //     <div className={classNames(classes)}>{i + 1}</div>
          //   </Link>
          // )
        })}
      </div>
    </div>
  ) : null;
};

export default WizardSteps;
