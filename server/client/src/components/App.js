import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Landing, Header, Dashboard, SurveyNew } from './';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, []);

  return (
    <div className='container'>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/surveys' component={Dashboard} />
          <Route exact path='/surveys/new' component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
