// Packages
import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

// Components
import RequireLogin from '../components/RequireLogin';

// Utility components
import CenteredSpinner from '../components/utility/CenteredSpinner';
import LoggedOutCard from '../components/utility/LoggedOutCard';
import PageTitle from '../components/utility/PageTitle';

class AllStudentData extends Component {

    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.RequireLogin = React.createRef();

        this.URL = "https://imperium-be.herokuapp.com";
        // this.URL = "http://localhost:8000";

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
                rut_apoderado: '',
                nombre_apoderado: '',
                apellido_apoderado: '',
                telefono_apoderado: '',
                direccion: '',
                rut_tio: '',
                telefono_tio: '',
                nombre_tio: '',
                apellido_tio: ''
            },
            StudentsFetchDone: false
        }
    }

    // once logged in
    componentDidMount(){
        this.UpdateData();
    }

    GetStudentsData = _ =>{
        var FetchURL = `${this.URL}/students/all`;

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ Students: resp.data }))
        .then(r => this.setState({ StudentsFetchDone: true }))
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

    RenderStudent = ({id,nombre_alumno,apellido_alumno,nivel,patente_furgon,curso,nombre_apoderado,apellido_apoderado,telefono_apoderado,direccion,rut_tio,telefono_tio,nombre_tio,apellido_tio}) =>
        <tr key={id}>
            <td>{nombre_alumno+' '+apellido_alumno}</td>
            <td>{curso}</td>
            <td>{direccion}</td>
            <td>{nombre_apoderado+' '+apellido_apoderado}</td>
            <td>{telefono_apoderado}</td>
            <td>{nombre_tio+' '+apellido_tio}</td>
            <td>{telefono_tio}</td>
        </tr>

    render() {
        const { UserLoggedIn } = this.state;
        const { Students } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} ref={this.RequireLogin}/>
                <PageTitle text="Datos de alumnos" />

                {
                    (UserLoggedIn === 'true')?
                        (Students.length)?
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Curso</th>
                                        <th>Dirección</th>
                                        <th>Apoderado</th>
                                        <th>Cel. Apoderado</th>
                                        <th>Tío</th>
                                        <th>Cel. Tío</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    { Students.map(this.RenderStudent) }
                                </tbody>
                            </Table>
                        </div>
                        :
                        (this.state.StudentsFetchDone === true)?
                            <center>No tienes estudiantes transportados</center>
                            :
                            <CenteredSpinner />
                    :
                    <LoggedOutCard />
                }
            </div>
        )
    }
}
export default AllStudentData;
