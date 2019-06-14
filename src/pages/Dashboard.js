// Packages
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

// Components
import RequireLogin from '../components/RequireLogin';

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

                <Card bg="info" text="white">
                    <Card.Header as="h5">Holita</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Como estás amigo, jeje
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Dashboard;
