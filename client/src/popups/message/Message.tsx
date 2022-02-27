import React from 'react'
import { ERROR } from '../types';

export interface IAppProps {
    message: string;
    type: string
}
interface Classes{
    button:string;
    buttonText:string;
    background:string
}

function createClasses(type: string): Classes{
    switch (type) {
        case ERROR:
            return {background:'message--error', button: "error", buttonText:'OK' };
        default: return {background:'', button: '',buttonText:'OK'}
    }
   
}

export default function App(props: IAppProps) {
    const classes = createClasses(props.type);

    return (
        <div className={`message ${classes.background}`}>
            <h1>{props.message}</h1>
            <button className={classes.button}>{classes.buttonText}</button>
        </div>
    );
}
