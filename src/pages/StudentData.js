import React, { Component } from 'react';
import RequireLogin from '../components/RequireLogin';
import Block from '../components/Block';
import {Spinner,Table} from 'react-bootstrap'

import '../App.css';
import '../css/Dashboard.css';

class StudentData extends Component {

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
        console.log(FetchURL);
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
    RenderStudent = ({id,nombre,apellido,nivel,patente_furgon,curso,tipo_viaje,sector}) =>
        <tr key={id}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{apellido}</td>
            <td>{nivel}</td>
            <td>{patente_furgon}</td>
            <td>{curso}</td>
            <td>{tipo_viaje}</td>
            <td>{sector}</td>
        </tr>
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
                                <div>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Nivel</th>
                                                <th>Patente</th>
                                                <th>Curso</th>
                                                <th>Tipo Viaje</th>
                                                <th>Sector</th>
                                            </tr>
                                         </thead>
                                         <tbody>
                                            {
                                                Students.map(this.RenderStudent)
                                            }
                                        </tbody>
                                    </Table>
                                </div>
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


export default StudentData  ;
