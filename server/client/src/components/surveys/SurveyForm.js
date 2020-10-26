import React from 'react';
import SurveyField from './SurveyField';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderFields = () => {
    return formFields.map(({ label, name }, index) => (
      <Field key={index} label={label} name={name} component={SurveyField} type='text' />
    ));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {renderFields()}
        <Link to='/surveys' className='red btn-flat white-text'>
          Cancel
        </Link>
        <button type='submit' className='teal btn-flat right white-text'>
          <i className='material-icons right'>done</i>
          Next
        </button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
};

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false,
})(SurveyForm);
