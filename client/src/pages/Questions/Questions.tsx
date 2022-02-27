import React, {FC, useEffect} from "react";
import VoteCard from "components/QuestionCard/QuestionCard";
import Header from "components/Header"
import './Questions.scss'
//redux
import {useAppDispatch, useAppSelector} from "redux/hooks";
import {
    getQuestionsThunk,
    allQuestions,
} from "redux/reducers/questionsReducers";
//components
import ButtonAppBar from "components/ButtonAppBar/ButtonAppBar";
import ApiData from "components/ApiData/ApiData";
import Tabs from 'components/Tabs'

export interface Group {
    status: string;
    votes: number;
    title: string;
    questionId: string;
}

const Questions: FC = () => {
    const dispatch = useAppDispatch();

    const questions = useAppSelector(allQuestions);

    useEffect(() => {
        dispatch(getQuestionsThunk());
    }, []);

    const renderList = (qs: any) => (
        <ApiData apiKey="questions/getQuestions">
            {qs.map((item: any, i: number) => (
                <VoteCard key={`question-${i}`} info={item}/>
            ))}
        </ApiData>
    )

    return (
        <div className="page page-questions">
            <Header/>
            <div className="page-content">
                <Tabs id="questions" tabs={[
                    {title: "My Questions", component: () => renderList(questions)},
                    {title: "Ongoing", component: () => renderList(questions.filter((item: any) => item.active))},
                    {title: "Pending", component: () => renderList([])},
                    {title: "Past", component: () => renderList(questions.filter((item: any) => !item.active))},
                ]}/>
            </div>
            <ButtonAppBar/>
        </div>
    );
};

export default Questions
