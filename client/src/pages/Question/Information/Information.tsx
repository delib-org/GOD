import React, {FC, useState, useEffect} from "react";
import {Tabs, Tab, Button} from "@mui/material";
import axios from 'axios';
import './Information.scss'
import AddIcon from "@mui/icons-material/Add";
import {useHistory} from "react-router-dom";

export interface QuestionInfoProps {
    question?: any;
}

const QuestionInfo = (props: QuestionInfoProps) => {
    // const [selectedTab, setSelectedTab] = useState(0);
    // const [questions, setQuestions] = useState([]);
    // const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    //   setSelectedTab(newValue);
    // };
    //
    // useEffect(() => {
    //   axios.post('/questions/get-all', {})
    //     .then(({ data }) => {
    //       console.log(data.result);
    //       setQuestions(data.result);
    //     }).catch(e => {
    //       console.error(e)
    //     })
    // }, [])

    const history = useHistory();

    const {question} = props

    const {title, description} = question


    return (
        <div className="question-info">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div className="section-title">Suggested solutions</div>

            <div className="toolbar">
                <Button
                    variant="contained"
                    // style={{
                    //     backgroundColor: "rgb(204 146 58)",
                    // }}
                    // startIcon={
                    //
                    // }
                    onClick={() => {
                        history.push('/create_suggestion')
                    }}
                >
                    <AddIcon/>
                </Button>
            </div>
        </div>
    );
};

export default QuestionInfo
