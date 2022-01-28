import React, { FC } from 'react';

import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import CreateQuestion0 from './CreateQuestion0';
import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';
import TopIndecator from '../../components/TopIndicator/TopIndecator';

export interface createQuestionProps {
    path: string;
}


const CreateQuestion: FC = () => {

   

    let { path } = useRouteMatch();
    const pages = ['1', '2', '3', '4'];

    return (
        <div>


            <Switch >
                <Route exact path={path}>

                    <CreateQuestion0 path={path} />
                </Route>
                <Route exact path={`${path}/1`}>
                    <TopIndecator pages={pages} path={path} />
                    <CreateQuestion1 path={path} />
                </Route>
                <Route exact path={`${path}/2`}>
                    <TopIndecator pages={pages} path={path} />
                    <CreateQuestion2 path={path}/>
                </Route>
                <Route exact path={`${path}/3`}>
                    <TopIndecator pages={pages} path={path} />
                    <CreateQuestion3 path={path} />
                </Route>
                <Route exact path={`${path}/4`}>
                    <TopIndecator pages={pages} path={path} />
                    <CreateQuestion4 path={path} />
                </Route>
            </Switch>

        </div >
    );
}

export default CreateQuestion;
