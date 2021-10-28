import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../routes/Home';
import FormModal from '../routes/FormModal';

const Routes = () => {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/FormModal' component={FormModal} />
      <Route path='/SpeechtoText' component={Home} />
      <Route path='/SpeechtoTextEnd' component={Home} />
    </Router>
  );
};

export default Routes;