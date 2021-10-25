import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Translate from './components/Translate';
import Home from './components/Home';
import About from './components/About';

const App = () => (
    <Router>
        <Route path="/"   component={Home} />
        <Route path="/about"  component={About} /> 
    </Router>
);

export default App;