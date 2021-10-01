import React, { FC, ReactElement, useState } from 'react';
import {
    Switch,

    useParams,
    useRouteMatch
} from "react-router-dom";

import { Navigation, Route, Screen, Link, glide } from "react-tiger-transition";


import "react-tiger-transition/styles/main.min.css";


import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';

glide({
    name: 'glide-left'
});
glide({
    name: 'glide-right',
    direction: 'right'
});

const screenStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};


export interface createQuestionProps {
    position: number;
    setPosition: React.Dispatch<React.SetStateAction<number>>;
}


const CreateQuestion: FC = () => {
    const [position, setPosition] = useState(1);
    let { path, url } = useRouteMatch();

    return (
        <div>
            <ul>
                <li>
                    <Link to={`${url}/1`}>1</Link>
                </li>
                <li>
                    <Link to={`${url}/2`}>2</Link>
                </li>
                <li>
                    <Link to={`${url}/3`}>3</Link>
                </li>
                <li>
                    <Link to={`${url}/4`}>4</Link>
                </li>
            </ul>

            <Navigation>
                {/* <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route> */}
                <Route path={`${path}/1`}>
                    <Screen style={{ backgroundColor: "#ffa000", ...screenStyle }}>
                        <Link to="/a" transition='glide-left'>
                            <CreateQuestion1 position={position} setPosition={setPosition} />
                        </Link>
                    </Screen>
                </Route>
                <Route exact path={`${path}/2`} screen screenProps={{ style: { backgroundColor: "#607d8b", ...screenStyle } }}>
                    <Link to="/" transition='glide-right'>
                        <CreateQuestion2 position={position} setPosition={setPosition} />
                    </Link>
                </Route>
                {/* <Route exact path={`${path}/3`}>
                    <CreateQuestion3 position={position} setPosition={setPosition} />
                </Route>
                <Route exact path={`${path}/4`}>
                    <CreateQuestion4 position={position} setPosition={setPosition} />
                </Route> */}
            </Navigation>

        </div >
    );
}

export default CreateQuestion;
