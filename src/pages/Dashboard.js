import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import Block from '../components/Block';

import '../App.css';
import '../css/Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <div className="page-title">
                    <h1>Escritorio</h1>
                    <hr />
                </div>

                <div className="row">
                    <div className="col">
                        <Block title="chaito" msg={'holita'} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
