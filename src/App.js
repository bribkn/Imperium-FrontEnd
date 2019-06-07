import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import StudentData from './pages/StudentData';

class App extends Component {
    render(){
        return (
            <Router>
                <div className="App">
                    <Navigation />

                    <div className="page-wrapper">
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/Dashboard" component={Dashboard} />
                        <Route path="/Profile" component={Profile} />
                        <Route path="/StudentData" component={StudentData} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
