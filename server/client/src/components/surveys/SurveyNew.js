import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [review, setReview] = useState(false);

  const renderContent = () => {
    if (review) {
      return <SurveyFormReview onReviewCancel={() => setReview(false)} />;
    }

    return <SurveyForm onSurveySubmit={() => setReview(true)} />;
  };

  return <>{renderContent()}</>;
};

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
