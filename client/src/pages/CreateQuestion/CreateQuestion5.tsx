import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import PublishIcon from '@mui/icons-material/Publish';
// Cloudaniry
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
// functions
import { NextButton, BackButton } from "components/Wizard";
import { newQuestionSelector } from 'redux/reducers/createQuestionReducer';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { upsertQuestion } from "redux/reducers/questionsReducers";
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion5: FC<CreateQuestionProps> = (
  props: CreateQuestionProps,
) => {
  const { path } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, description, image, _id } = useAppSelector(newQuestionSelector);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'god-delib',
    },
  });
  let imagePublicId: string = '';
  let myImage;
  if (image.public_id) {
    imagePublicId = image.public_id;
    myImage = cld.image(imagePublicId);
  }

  const submit = () => dispatch(
    upsertQuestion({ _id, title, description, image, status: 'pending' }, () => history.push('/create_question/success'))
  )

  return (
    <div>
      <div className="wrapper">
        <h1>Preview</h1>
        <p className="warnings--text">Review all details and go back editing if needed.</p>
        <div className="preview">
          {myImage && <AdvancedImage cldImg={myImage} />}
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="bottomNavButtons">
        <BackButton linkTo={`${path}/4`} />
        {/* eslint-disable-next-line */}
        <NextButton onClick={submit} text="Publish" Icon={() => <PublishIcon />} />
      </div>
    </div>
  );
};

export default CreateQuestion5;
