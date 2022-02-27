import React, {FC, useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import Tabs from 'components/Tabs'
import './Question.scss';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import "./Question.scss";
import _ from 'lodash'

import {useAppSelector, useAppDispatch} from "redux/hooks";

//redux
import {allMessages, addMessage} from 'redux/reducers/chatReducer';
import {questionById} from 'redux/reducers/questionsReducers'

//components
import Discussion from "./Discussion";
import QuestionInfo from './Information'
import {joinRoom, leaveRoom} from "utils/socket";

export interface QuestionProps {
    info?: any;
}

interface QuestionParams {
    questionId: string
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {

    const params = useParams<QuestionParams>();
    console.log(params)
    let questionId = '';
    if ('questionId' in params) {
        questionId = params.questionId
    }

    const dispatch = useAppDispatch();
    const question = useAppSelector(questionById(questionId))
    const messages = useAppSelector(allMessages).filter(msg => msg.parentId === questionId);

    useEffect(() => {
        joinRoom(questionId, (messageObj: any) => {
            console.log('message received', messageObj.text)
            dispatch(addMessage(messageObj))
        })
        console.log('joined room', questionId)
        return () => {
            leaveRoom(questionId)
            console.log('left room', questionId)
        }
    }, [])

    const imageUrl = question.image?.secure_url

    return (
        <div className="page page-question">
            <div className="question-header" style={{backgroundImage: imageUrl ? `url(${imageUrl}` : 'none'}}>
                <div className="share-button"><ShareIcon/></div>
            </div>
            <Tabs id="questions" tabs={[
                {title: "Solutions", component: () => (<QuestionInfo question={question}/>)},
                {title: "Discussion", component: () => (<Discussion questionId={questionId} messages={messages}/>)},
                {title: "Vote", component: () => (<div><h2>Vote</h2></div>)},
            ]}/>
            <div className="bottom-nav">
                <Link to="/questions" style={{textDecoration: 'none'}}>
                    <Button>
                        <ArrowBackIcon/>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
export default Question;
