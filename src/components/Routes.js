import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../routes/Home';
import Result from '../routes/Result';

const Routes = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/result' component={Result} />
    </Router>
  );
};

export default Routes;
