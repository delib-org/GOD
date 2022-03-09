import React, {useState} from "react";
import './AddSolution.scss'
import InternalHeader from "components/InternalHeader";
import {useHistory, useParams} from "react-router";
import {useWizard} from "use-wizard"
import Button from "@mui/material/Button";
import HtmlEditor from "components/HtmlEditor";
import {Solution} from "types";
import SolutionCard from "components/SolutionCard";
import {useAppDispatch} from "redux/hooks";
import {addSolution} from 'redux/reducers/questionsReducers'
import TextField from "@mui/material/TextField";
import _ from 'lodash'

interface QuestionParams {
    questionId: string
}

interface StepProps {
    questionId: string,
    wizard: any,
    solution: Solution,
    setSolution: Function,
    submit?: Function,
}

const Step1 = (props: StepProps) => {
    const {wizard} = props

    return (
        <>
            <div className="step step-1">
                <h2>Do you have A potential solution?</h2>
                <div className="warnings--text">Please read the guideline before submitting</div>
                <ul>
                    <li>Read the question carefully and make sure you write your answer or solution to the issue
                        presented.
                    </li>
                    <li>Links to external resources are encouraged, same for tagging resources from the Data center,
                        just
                        make sure you hashtag the correct resource. Example: #Article1
                    </li>
                    <li>Answers with correct spelling, punctuation, and grammar are easier to read. They also tend to
                        get
                        upvoted more frequently.
                    </li>
                    <li>Before publishing review your answer as once submitted it cannot be edited or modified</li>
                </ul>
            </div>
            <div className="buttons">
                <Button variant="contained" onClick={() => wizard.nextStep()}>Let's Start</Button>
            </div>
        </>
    )
}

const Step2 = (props: StepProps) => {
    const {wizard, solution, setSolution} = props

    return (
        <>
            <div className="step step-2">
                <h2>Solution Title</h2>
                <TextField id="standard-basic" defaultValue={_.get(solution, 'title', '')} label="Title"
                           variant="outlined" fullWidth type="text" name='title'
                           onChange={(e: any) => setSolution({...solution, title: e.target.value})}/>
                <h2>Add Your Solution</h2>
                <HtmlEditor html={solution.description} toolbarHidden={true} placeholder="Description"
                            onChange={(description: string) => setSolution({...solution, description})}/>
            </div>
            <div className="buttons">
                <Button onClick={() => wizard.previousStep()}>{'< Back'}</Button>
                <Button variant="contained" onClick={() => wizard.nextStep()}>{'Preview >'}</Button>
            </div>
        </>
    )
}

const Step3 = (props: StepProps) => {

    const {questionId, wizard, solution, submit} = props

    return (
        <>
            <div className="step step-3">
                <h2>Preview</h2>
                <div className="warnings--text">Please review all details as once an answer is published it cannot be edited.</div>
                <SolutionCard solution={solution} number={-1} fullText={true} questionId={questionId}/>
            </div>
            <div className="buttons">
                <Button onClick={() => wizard.previousStep()}>{'< Back'}</Button>
                <Button variant="contained" onClick={() => submit && submit()}>Submit</Button>
            </div>
        </>
    )
}

const AddSolution = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const params = useParams<QuestionParams>()

    const [step, wizard] = useWizard()
    const [solution, setSolution] = useState<Solution>({
        title: 'Solution 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })

    const submit = () => {
        dispatch(addSolution({
            ...solution,
            parentId: params.questionId,
            parentType: 'question',
        }))
        history.push(`/question/${params.questionId}`)
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 wizard={wizard} solution={solution} setSolution={setSolution} questionId={params.questionId}/>
            case 2:
                return <Step2 wizard={wizard} solution={solution} setSolution={setSolution} questionId={params.questionId}/>
            case 3:
                return <Step3 wizard={wizard} solution={solution} setSolution={setSolution} submit={submit} questionId={params.questionId}/>
            default:
                return null
        }
    }

    return (
        <div className="add-solution">
            <InternalHeader title="Add Solution" backUrl={`/question/${params.questionId}`}/>
            {renderStep()}
        </div>
    );
};

export default AddSolution