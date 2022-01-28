import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

//redux 
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectQuestionId, selectTitle, selectDescription, selectImage, setQuestionId, setActivate } from '../../../redux/reducers/createQuestionReducer';

//material UI components
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

//Cloudaniry
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

//components
import { createQuestionProps } from './CreateQuestion';

//functions
import { createUpdateQuestion, activateQuestion } from '../../../controlers/questions/questions'


const CreateQuestion4: FC<createQuestionProps> = (props: createQuestionProps) => {
    const { path } = props;


    const dispatch = useAppDispatch();
    const questionId = useAppSelector(selectQuestionId);
    const title = useAppSelector(selectTitle);
    const description = useAppSelector(selectDescription);
    const image = useAppSelector(selectImage);


    useEffect(() => {
        //save question as draft 

        createUpdateQuestion(title, description, image).then(questionId => {

            dispatch(setQuestionId(questionId));
        })
        // eslint-disable-next-line
    }, [])

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'god-delib'
        }
    });
    let imagePublicId: string = '';
    let myImage;
    if (image.public_id) {
        imagePublicId = image.public_id;
        myImage = cld.image(imagePublicId);
        myImage.resize(fill().width(120));

    }

    return (
        <div>
            <div className="wrapper">
                <h1>Share it</h1>
                <p>This is the moment your idea is sent out to the world. Finish the process by Inviting the people relevant to solving this issue., Together you will reach a better solution.
                </p>
                <div className="share__wrapper">
                    <Button variant="outlined" startIcon={<MailOutlineIcon />}>Share using E-Mail</Button>
                    <Button variant="outlined" startIcon={<WhatsappIcon />}>share using Whatsapp</Button>
                    <div className="share__preview">
                        {myImage ?
                            <div className="share__preview__image">
                                <AdvancedImage cldImg={myImage} />
                            </div> : null
                        }
                        <div className="share__preview__main">
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bottomNavButtons">
                <Link to={`${path}/3`}>
                    <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>Back</Button>
                </Link>

                <Button variant="contained" endIcon={<CheckCircleIcon />} onClick={handleFinish}>finish</Button>


            </div>
        </div>

    );
    function handleFinish() {
        try {

            console.log("finish", questionId)
            if (typeof questionId === 'string') {
                activateQuestion(true, questionId).then(activate => {
                    console.log(activate);
                    dispatch(setActivate(activate));
                })
            } else {
                console.info(questionId)
                throw new Error('question Id is not of type string')
            }
        } catch (err: any) {
            console.error(err.message)
        }

    }
}

export default CreateQuestion4;