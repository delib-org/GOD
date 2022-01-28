import * as React from 'react';
import './Loader.scss';

export interface IAppProps {
}
function Loader(props: IAppProps) {
    return (
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default Loader;