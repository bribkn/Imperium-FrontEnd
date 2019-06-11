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
            PersonalDatas: [],
            PersonalData: {
                rut: 0,
                nombre: '',
                apellido: '',
                telefono: '',
                direccion: '',
                rol: 0,
            },
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

    GetPersonalData = _ => {
        var FetchURL = this.URL+`/users/search?rut=`+this.state.UserRUT;
        console.log(FetchURL);

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ PersonalDatas: resp.data }))
        .catch(err => console.error(err))
    }
    getStudentsData = _ =>{
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
            this.GetPersonalData();
            this.getStudentsData();
        })
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    RenderPersonalData = ({rut, nombre, apellido, telefono, direccion, rol}) => <div key={rut}>{rut}<br /> {nombre} <br /> {apellido} <br /> {telefono} <br /> {direccion} <br /></div>
    RenderStudent = ({id,nombre,apellido,nivel,patente_furgon,curso,tipo_viaje,sector}) =>
        <tr key={id}>
            <td>{nombre}</td>
            <td>{apellido}</td>
                <Checkbox
                    title= "Hola"
                />
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
                            <div>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Asistencia</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        {
                                            Students.length?
                                            Students.map(this.RenderStudent)
                                            :
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>

                                        }
                                    </tbody>
                                </Table>
                            </div>
                            :
                            <Block title="Inicia sesión" msg="Debes iniciar sesión antes de continuar." />
                        }
                    </div>
        );
    }
}
//
//     render() {
//         return (
//             <label>
//                 <Checkbox
//                     title= "Brian Bastías"
//                 />
//                 <Checkbox
//                     title= "Brian Bastías"
//                 />
//                 <Checkbox
//                     title= "Brian Bastías"
//                 />
//             </label>
//         )
//     }
// }

export default List  ;
