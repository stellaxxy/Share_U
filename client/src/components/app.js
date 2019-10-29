import React from 'react';
import {Route} from 'react-router-dom';
import '../assets/css/app.scss';
import Landing from "./landing";
import Login from './login';

const App = () => (
    <div className="appDiv">
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
    </div>
);

export default App;
