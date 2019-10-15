import React from 'react';
import {Route} from 'react-router-dom';
import '../assets/css/app.scss';
import Landing from "./landing";

const App = () => (
    <div className="appDiv">
        <Route exact path="/" component={Landing}/>
    </div>
);

export default App;
