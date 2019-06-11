import React, { Component } from 'react';
import Block from '../components/Block';
import RequireLogin from '../components/RequireLogin';
import {Spinner} from 'react-bootstrap'

import '../App.css';
import '../css/Dashboard.css';

class Profile extends Component {
    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.RequireLogin = React.createRef();

        this.URL = "https://imperium-be.herokuapp.com";
        //this.URL = "http://localhost:8000";

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
                rut: 0,
                nombre: '',
                apellido: '',
                telefono: '',
                direccion: '',
                rol: 0,
            }
        }
    }

    // once logged in,
    componentDidMount(){
        this.UpdateData();
    }

    GetPersonalData = _ => {
        var FetchURL = this.URL+`/users/search?rut=`+this.state.UserRUT;
        console.log(FetchURL);

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ PersonalDatas: resp.data }))
        .catch(err => console.error(err))
    }

    // This function updates session data
    // gets called from RequireLogin.js
    UpdateData(){
        this.setState({ UserRUT: localStorage.getItem('UserRUT') }, () => {
            this.GetPersonalData();
        })
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    RenderPersonalData = ({rut, nombre, apellido, telefono, direccion, rol}) => <div key={rut}>{rut}<br /> {nombre} <br /> {apellido} <br /> {telefono} <br /> {direccion} <br /></div>

    render() {
        const { UserLoggedIn } = this.state;
        const { UserName } = this.state;
        const { PersonalDatas } = this.state;

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
                                {
                                    <div>
                                        {
                                            PersonalDatas.length?
                                            PersonalDatas.map(this.RenderPersonalData)
                                            :
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        }
                                        <button onClick={this.RequireLogin.current.HandleLogout} className="btn btn-primary">Logout</button>
                                    </div>
                                }
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
