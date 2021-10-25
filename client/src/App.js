import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Translate from './components/Translate';
import Home from './components/Home';


const App = () => (
    <Router>
        <Route path="/" component={Home} />
    </Router>
);

export default App;