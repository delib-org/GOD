import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './Tabs.scss';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

interface TabProps {
  title: string,
  hidden?: boolean,
  component?: any,
  link?: string,
}

interface TabsProps {
  id: string,
  tabs: TabProps[],
  activeTab?: number,
  isMenu?: boolean,
  before?: any,
  after?: any,
}

function Tabs(props: TabsProps) {
  const location = useLocation();

  const {
    id, tabs, activeTab: inActiveTab = 0, isMenu, before = undefined, after = undefined,
  } = props;
  const [activeTab, setActiveTab] = useState(inActiveTab);

  useEffect(() => {
    if (activeTab >= _.size(tabs)) {
      setActiveTab(0);
    }
  }, [_.size(tabs)]);

  useEffect(() => {
    const match = _.reduce(tabs, (memo, { link }, i) => {
      console.log({ link });
      return link === location.pathname ? i : memo;
    }, -1);
    if (match > -1) {
      setActiveTab(match);
    }
  }, []);

  if (activeTab >= _.size(tabs)) return null;

  const renderTabHeader = ({ title, hidden, link }: TabProps, i: number) => {
    if (hidden) return null;

    const tabKey = `tab-header-${id}-${i}`;

    return (
      <div
        key={tabKey}
        className={classNames('tab-header', { active: i === activeTab })}
        onClick={() => setActiveTab(i)}
      >
        {isMenu ? (<NavLink key={tabKey} to={link}>{title}</NavLink>) : title}
      </div>
    );
  };

  return (
    <div className="tabs">
      {_.size(tabs) > 1 && (
        <div className="center-aligned-row tabs-header">
          {_.map(tabs, renderTabHeader)}
        </div>
      )}
      {!isMenu && (
        <div className="active-tab">
          {_.isFunction(before) && before()}
          {tabs[activeTab].component()}
          {_.isFunction(after) && after()}
        </div>
      )}
    </div>
  );
}

export default Tabs;
