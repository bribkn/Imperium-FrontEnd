import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

class App extends Component {
    render(){
        return (
            <Router>
                <div className="App">
                    < Navigation />

                    <div className="page-wrapper">
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/Dashboard" component={Dashboard} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
