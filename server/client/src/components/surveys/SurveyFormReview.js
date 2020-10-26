import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formFields from './formFields.js';
import { submitSurvey } from '../../actions/index.js';
import useReactRouter from 'use-react-router';

const SurveyFormReview = ({ onReviewCancel }) => {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.form.surveyForm.values);
  const { history } = useReactRouter();

  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className='yellow darken-3 white-text btn-flat' onClick={onReviewCancel}>
        Back
      </button>
      <button
        className='green btn-flat right white-text'
        onClick={() => dispatch(submitSurvey(formValues, history))}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

export default SurveyFormReview;
