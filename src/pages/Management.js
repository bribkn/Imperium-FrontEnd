import React, { Component } from 'react';
import RequireLogin from '../components/RequireLogin';
import { Button, Tabs, Tab, Form, Col, Row, Card } from 'react-bootstrap'

import '../App.css';
import '../css/Management.css';

class Management extends Component {

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
            TioPatente: '',
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

    HandleAdd = (event) => {
        event.preventDefault();
        var name = event.target[0].value;
        var subname = event.target[1].value;
        var level = event.target[2].value;
        var classNumber = event.target[3].value;
        var classLetter = event.target[4].value;
        var travelType = event.target[5].value;
        var sector = event.target[6].value;
        var patente_furgon = 'PNPN69'
        console.log(name,subname,level,classNumber,classLetter,sector);

        var FetchURL = this.URL+`/students/register?nombre=`+name+`&apellido=`+subname+`&nivel=`+level+`&patente_furgon=`+patente_furgon+`&curso=`+classNumber+classLetter+`&tipo_viaje=`+travelType+`&sector=`+sector;
        console.log(FetchURL);
        fetch(FetchURL)
        .then(response => response.json())
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
        (<tr key={id}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{apellido}</td>
            <td>{nivel}</td>
            <td>{patente_furgon}</td>
            <td>{curso}</td>
            <td>{tipo_viaje}</td>
            <td>{sector}</td>
        </tr>)

    RenderModify = ({id,nombre,apellido}) =>(
        <option key={id}>
            {nombre + " " + apellido}
        </option>
        )
    render() {

        const { UserLoggedIn } = this.state;
        const { Students } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} ref={this.RequireLogin}/>
                    <div className="page-title">
                        <h1>Modificar datos alumnos</h1>
                        <hr />
                    </div>
                    <div>
                    {
                        (UserLoggedIn === 'true')?
                        <Tabs className= 'tablita' defaultActiveKey="add" id="uncontrolled-tab-example">
                            <Tab className= 'tab-container' eventKey="add" title="Agregar">
                                {
                                    <Form id="AddForm" onSubmit={this.HandleAdd}>
                                        <Form.Group controlId="AddForm">
                                            <Form.Label>Nombre alumno</Form.Label>
                                                <Form.Control type="name" placeholder="Ej: Brian" />
                                            <Form.Label>Apellido alumno</Form.Label>
                                                <Form.Control type="subname" placeholder="Ej: Bastías" />
                                            <Form.Label>Nivel alumno</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Básica</option>
                                                    <option>Media</option>
                                                    <option>Kinder</option>
                                                    <option>Pre-kinder</option>
                                                </Form.Control>
                                            <Form.Label>Curso alumno</Form.Label>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <Form.Control as="select">
                                                            <option>1º</option>
                                                            <option>2º</option>
                                                            <option>3º</option>
                                                            <option>4º</option>
                                                            <option>5º</option>
                                                            <option>6º</option>
                                                            <option>7º</option>
                                                            <option>8º</option>
                                                            <option>No aplica</option>
                                                        </Form.Control>
                                                    </Col>
                                                    <Col>
                                                        <Form.Control as="select">
                                                            <option>A</option>
                                                            <option>B</option>
                                                            <option>C</option>
                                                            <option>D</option>
                                                            <option>E</option>
                                                            <option>F</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Form.Label>Tipo de viaje</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Ida</option>
                                                    <option>Vuelta</option>
                                                    <option>Completo</option>
                                                </Form.Control>
                                            <Form.Label>Sector Alumno</Form.Label>
                                            <Form.Control type="sector" placeholder="Ej: 1-2" />
                                        </Form.Group>
                                        <Button form="AddForm" type="submit" variant="primary">
                                            Agregar
                                        </Button>
                                    </Form>
                                }
                            </Tab>

                            <Tab className= 'tab-container' eventKey='modify' title='Modificar'>
                                <Form>
                                    <Form.Label>Seleccione alumno a modificar</Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control as="select">
                                        {
                                            Students.map(this.RenderModify)
                                        }
                                        </Form.Control>
                                        <Form.Label>Nivel alumno</Form.Label>
                                        <Form.Control as="select">
                                            <option>Básica</option>
                                            <option>Media</option>
                                            <option>Kinder</option>
                                            <option>Pre-kinder</option>
                                        </Form.Control>
                                        <Form.Label>Curso alumno</Form.Label>
                                                <Row>
                                                    <Col>
                                                        <Form.Control as="select">
                                                            <option>1º</option>
                                                            <option>2º</option>
                                                            <option>3º</option>
                                                            <option>4º</option>
                                                            <option>5º</option>
                                                            <option>6º</option>
                                                            <option>7º</option>
                                                            <option>8º</option>
                                                            <option>No aplica</option>
                                                        </Form.Control>
                                                    </Col>
                                                    <Col>
                                                        <Form.Control as="select">
                                                            <option>A</option>
                                                            <option>B</option>
                                                            <option>C</option>
                                                            <option>D</option>
                                                            <option>E</option>
                                                            <option>F</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                        <Form.Label>Sector Alumno</Form.Label>
                                        <Form.Control type="sector" placeholder="Ej: 1-2" />
                                    </Form.Group>
                                    <Button variant="primary">
                                        Modificar
                                    </Button>
                                </Form>
                            </Tab>
                            
                            <Tab className= 'tab-container' eventKey="delete" title="Eliminar">
                                <Form>
                                    <Form.Label>Seleccione alumno a eliminar</Form.Label>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control as="select">
                                        {
                                            Students.map(this.RenderModify)
                                        }
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary">
                                        Eliminar
                                    </Button>
                                </Form>
                            </Tab>
                        </Tabs>
                        :
                        <Card bg="info" text="white">
                            <Card.Header as="h5">Inicia sesión</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Debes iniciar sesión antes de continuar.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    </div>
            </div>
        );
    }
}
export default Management;
