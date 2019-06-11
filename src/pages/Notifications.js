import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import RequireLogin from '../components/RequireLogin';
import {Modal, Form, Button,Accordion, Card} from 'react-bootstrap';

import '../App.css';
import '../css/Dashboard.css';

class Notifications extends Component {
    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.SwapLoginModal = this.SwapLoginModal.bind(this);
        this.RequireLogin = React.createRef();

        //this.URL = "https://imperium-be.herokuapp.com";
        this.URL = "http://localhost:8000";

        this.state = {
            Show: false,
            UserLoggedIn: false,
            UserRUT: 0,
            UserName: '',
            UserNick: '',
            UserContact: '',
            UserAddress: '',
            UserRol: '',
            Names: [],
            Name: {
                rut: 0,
                nombre: '',
                apellido: '',
                telefono: '',
                direccion: '',
                rol: 0
            },
            TargetUserRUT: 0,
            TargetUserName: '',
            Notifications: [],
            Notification: {
                id: 0,
                rut_emisor: 0,
                rut_receptor:0,
                mensaje: ''
            }
        }
    }

    // once logged in,
    componentDidMount(){
        this.UpdateData();
    }

     // This function helps Modal to be turn On/Off.
     SwapLoginModal() {
        var CurrentShowState = this.state.Show;
        this.setState({ Show: !CurrentShowState });
    }

    GetNames = _ => {
        var FetchURL = this.URL+`/notification/search?rut=`+this.state.UserRUT;
        console.log(FetchURL);

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ Notifications: resp.data}))
        .catch(err => console.error(err))
    }

    //Notifications fetch
    GetNotifications = _ => {
        var FetchURL = this.URL + `/message/search?rut=`+this.state.UserRUT;
        console.log(FetchURL)

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ Notifications: resp.data }))
        .catch(err => console.error(err))
    }

    RenderModalWithTargetRUT( rut, nombre, apellido ){
        this.setState({ Show: true })
        this.setState({ TargetUserRUT: rut})
        this.setState({ TargetUserName: nombre+" "+apellido })
    }

    RenderAccordionWithNotification (rut_emisor, mensaje) {
        this.setState({Message: mensaje})
    }

    // This function updates session data
    // gets called from RequireLogin.js
    UpdateData(){
        this.setState({ UserRUT: localStorage.getItem('UserRUT') }, () => {
            this.GetNames();
            this.GetNotifications();
        })
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    RenderNames = ({rut, nombre, apellido}) => 
    <Dropdown.Item onClick={ () => this.RenderModalWithTargetRUT(rut, nombre, apellido)}>
        {"["+rut+"] "+ nombre + " " + apellido}
    </Dropdown.Item>

    RenderNotifications = ({id, nombre, apellido, mensaje, fecha}) =>
    <Accordion defaultActiveKey="-1">
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {"De: " + nombre + " "+ apellido + " ["+fecha+"]"}
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <Card.Body>{mensaje}</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>

    render() {
        const { Names } = this.state;
        const { Notifications } = this.state;
        const { Show } = this.state;
        const { TargetUserName } = this.state;

        return (
            <div>
                <h1>Enviar notificación personalizada:</h1>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Elegir Destinatario
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {Names.map(this.RenderNames)}
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={Show} animation={true} keyboard={true}>
                <Modal.Header>
                    <Modal.Title>{"Enviar a " + TargetUserName }</Modal.Title>
                </Modal.Header>
                    
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ingrese su mensaje:</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success">Enviar</Button>
                    <button onClick={this.SwapLoginModal} className="btn btn-secondary">Cerrar</button>  
                </Modal.Footer>
            </Modal>
            
            <br/>
            <h1> Mis Notificaciones: </h1>
                {Notifications.map(this.RenderNotifications)}
            </div>
        )
    }
}

export default Notifications;
