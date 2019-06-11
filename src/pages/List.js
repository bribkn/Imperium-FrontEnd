import React, { Component } from 'react';
import RequireLogin from '../components/RequireLogin';
import Block from '../components/Block';
import Checkbox from '../components/Checkbox';
import {Spinner,Table} from 'react-bootstrap'

import '../App.css';
import '../css/Dashboard.css';
import '../css/Checkbox.css';

class List extends Component {

    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.RequireLogin = React.createRef();

        // this.URL = "https://imperium-be.herokuapp.com";
        this.URL = "http://localhost:8000";

        this.state = {
            UserLoggedIn: false,
            UserRUT: 0,
            UserName: '',
            UserNick: '',
            UserContact: '',
            UserAddress: '',
            UserRol: '',
            Students: [],
            Student:{
                id: 0,
                nombre: '',
                apellido: '',
                nivel: '',
                patente_furgon: '',
                curso: '',
                tipo_viaje: '',
                sector: '',
            }
        }
    }

    // once logged in
    componentDidMount(){
        this.UpdateData();
    }

    GetStudentsData = _ =>{
        var FetchURL = this.URL+`/students/tio?rut=`+this.state.UserRUT;

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ Students: resp.data }))
        .catch(err => console.error(err))
    }

    // This function updates session data
    // gets called from RequireLogin.js
    UpdateData(){
        this.setState({ UserRUT: localStorage.getItem('UserRUT') }, () => {
            this.GetStudentsData();
        })
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    RenderStudent = ({id, nombre, apellido}) =>
        <div key={id}>
            <Checkbox
                title= "Hola" name= {nombre + " "+ apellido}
            />
        </div>

    render() {
        const { UserLoggedIn } = this.state;
        const { Students } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} ref={this.RequireLogin}/>
                    <div className="page-title">
                        <h1>Lista de alumnos</h1>
                        <hr />
                    </div>
                        {
                            (UserLoggedIn === 'true')?
                                (Students.length)?
                                Students.map(this.RenderStudent)
                                :
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            :
                            <Block title="Inicia sesión" msg="Debes iniciar sesión antes de continuar." />
                        }
                    </div>
        );
    }
}

export default List  ;
