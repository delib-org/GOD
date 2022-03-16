import React, { FC, useEffect } from 'react';
import { includes } from 'lodash'
import VoteCard from 'components/QuestionCard/QuestionCard';
import Header from 'components/Header';
import './Questions.scss';
// redux
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getQuestionsThunk,
  allQuestionsArray,
} from 'redux/reducers/questionsReducers';
// components
import ButtonAppBar from 'components/ButtonAppBar/ButtonAppBar';
import ApiData from 'components/ApiData/ApiData';
import Tabs from 'components/Tabs';
import { userSelector } from "../../redux/reducers/userReducer";

const Questions: FC = () => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(allQuestionsArray);
  const { id: userId } = useAppSelector(userSelector)

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, []);

  const renderList = (qs: any) => (
    <ApiData apiKey="questions/getQuestions">
      {qs.map((item: any) => (
        <VoteCard key={`question-${item._id}`} question={item} />
      ))}
    </ApiData>
  );

  return (
    <div className="page page-questions">
      <Header />
      <div className="page-content">
        <Tabs
          id="questions"
          tabs={[ // todo - memoize lists
            { title: 'Watchlist', component: () => renderList(questions.filter((q: any) => includes(q.members, userId))) },
            { title: 'Ongoing', component: () => renderList(questions.filter((q: any) => q.status === 'suggestions' || q.status === 'vote')) },
            { title: 'Pending', component: () => renderList(questions.filter((q: any) => q.status === 'pending')) },
            { title: 'Past', component: () => renderList(questions.filter((q: any) => q.status === 'closed')) },
          ]}
        />
      </div>
      <ButtonAppBar />
    </div>
  );
};

export default Questions;
