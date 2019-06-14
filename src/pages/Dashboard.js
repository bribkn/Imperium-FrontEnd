import React, { Component } from 'react';
import Block from '../components/Block';
import RequireLogin from '../components/RequireLogin';

import '../App.css';
import '../css/Dashboard.css';

class Dashboard extends Component {
    constructor(props, context){
        super(props, context);
        this.UpdateData = this.UpdateData.bind(this);

        this.state = {
            UserLoggedIn: false,
            UserName: ''
        }
    }

    // get session values (logged in or not)
    componentDidMount(){
        this.UpdateData();
    }

    // This function updates session data
    // gets called from RequireLogin.js
    UpdateData(){
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
    }

    render() {
        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} />

                <div className="page-title">
                    <h1>Escritorio</h1>
                    <hr />
                </div>

                <div className="row">
                    <div className="col">
                        <Block title="chaito" msg="holita" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
