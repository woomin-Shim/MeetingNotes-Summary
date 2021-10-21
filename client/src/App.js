import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Translate from './components/Translate';

const App = () => (
    <Router>
        <Route path="/" exact component={Translate} />
    </Router>
);

export default App;