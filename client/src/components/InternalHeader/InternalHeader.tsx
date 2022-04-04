import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import './InternalHeader.scss';

interface InternalHeaderProps {
  title?: string;
  backUrl?: string;
  children?: any;
}

function InternalHeader(props: InternalHeaderProps) {
  const history = useHistory();

  const { title, backUrl, children } = props;

  return (
    <div className="internal-header">
      <div>
        {backUrl ? (<ArrowBack onClick={() => history.push(backUrl)} />) : (<div />)}
      </div>
      <div className="header-title">{title}</div>
      <div>{children}</div>
    </div>
  );
}
export default InternalHeader;
