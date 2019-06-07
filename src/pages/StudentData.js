import React, { Component } from 'react';
import Block from '../components/Block';
import RequireLogin from '../components/RequireLogin';

import '../App.css';
import '../css/Dashboard.css';

class StudentData extends Component {
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

    GetStudentsData(){

    }

    render() {
        const { UserLoggedIn } = this.state;
        const { UserName } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} />

                <div className="page-title">
                    <h1>Datos de alumnos</h1>
                    <hr />
                </div>

                <div className="row">
                    <div className="col">
                        {
                            (UserLoggedIn === 'true')?
                            <Block title={"Bienvenido, "+UserName } msg="holita" />
                            :
                            <Block title="Inicia sesión" msg="holita" />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentData;
