import React, { Component } from 'react';
import Block from '../components/Block';
import RequireLogin from '../components/RequireLogin';

import '../App.css';
import '../css/Dashboard.css';

class Profile extends Component {
    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.RequireLogin = React.createRef();

        this.state = {
            UserLoggedIn: false,
            UserRUT: 0,
            UserName: '',
            UserNick: '',
            UserContact: '',
            UserAddress: '',
            UserRol: '',
            PersonalDatas: [],
            PersonalData: {
                id: '',
                description: '',
                times_bought: 0,
                times_sold: 0,
                type: '',
                color: '',
                sell_price: 0
            }
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
        this.setState({ UserRUT: localStorage.getItem('UserRUT') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    render() {
        const { UserLoggedIn } = this.state;
        const { UserName } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} ref={this.RequireLogin}/>

                <div className="page-title">
                    <h1>Mi Perfil</h1>
                    <hr />
                </div>

                <div className="row">
                    <div className="col">
                        {
                            (UserLoggedIn === 'true')?
                            <div>
                                <Block title={"Bienvenido, "+UserName } msg=
                                    <div>
                                        <button onClick={this.RequireLogin.current.HandleLogout} className="btn btn-primary">Logout</button>
                                    </div>
                                />
                            </div>
                            :
                            <Block title="Inicia sesión" msg="Debes iniciar sesión antes de continuar." />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
