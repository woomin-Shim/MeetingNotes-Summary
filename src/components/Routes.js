import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../routes/Home';
import FormWindow from '../routes/FormWindow';

const Routes = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/formWindow' component={FormWindow} />
    </Router>
  );
};

export default Routes;
