// Packages
import React, { Component } from 'react';
import { Card, Badge, Col, Row } from 'react-bootstrap';

// Components
import RequireLogin from '../components/RequireLogin';

// Utility components
import CenteredSpinner from '../components/utility/CenteredSpinner';
import LoggedOutCard from '../components/utility/LoggedOutCard';
import PageTitle from '../components/utility/PageTitle';

class Profile extends Component {
    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.RequireLogin = React.createRef();

        // this.URL = "http://localhost:8000";
        this.URL = "https://imperium-be.herokuapp.com";

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

    Clean (rut) {
        return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : ''
    }

    FormatRUT (rut) {
        rut = this.Clean(rut)

        var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)

        for (var i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result
        }

        return result
    }

    // Get personal data on the web cache
    componentDidMount(){
        this.UpdateData();
    }

    GetPersonalData = _ => {
        var FetchURL = `${this.URL}/users/search?rut=${this.state.UserRUT}`;

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

    GenerateRoleString = (rol) => {
        if ( rol === 0 ) {
            return "Inspector";
        }else if( rol === 1 ){
            return "Apoderado";
        }else if( rol === 2 ){
            return "Tío";
        }else if( rol === 3 ){
            return "Administrador";
        }else if( rol === 10 ){
            return "Dios";
        }
    }

    RenderPersonalData = ({rut, nombre, apellido, telefono, direccion, rol}) => (
        <div className='personal-data-container' key={rut}>
            <Row>
                <Col sm={2}><b>RUT: </b></Col>
                <Col sm={4}>{this.FormatRUT(rut.toString())}</Col>

                <Col sm={2}><b>Nombre: </b></Col>
                <Col sm={4}>{nombre + ' ' + apellido} <Badge style={{'padding':'4px'}}variant="warning">{this.GenerateRoleString(rol)}</Badge> </Col>
            </Row>

            <Row>
                <Col sm={2}><b>Dirección: </b></Col>
                <Col sm={4}>{direccion}</Col>

                <Col sm={2}><b>Contacto: </b></Col>
                <Col sm={4}>{telefono}</Col>
            </Row>

            <br />

            <Row>
                <Col md={{ span: 4, offset:5 }}><button onClick={this.RequireLogin.current.HandleLogout} className="btn btn-danger">Cerrar sesión</button></Col>
            </Row>
        </div>
    )

    render() {
        const { UserLoggedIn } = this.state;
        const { UserName } = this.state;
        const { PersonalDatas } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} ref={this.RequireLogin}/>
                <PageTitle text="Mi Perfil" />

                {
                    (UserLoggedIn === 'true')?
                    <Card bg="info" text="white">
                        <Card.Header as="h5">
                            { "Bienvenido, " + UserName }
                        </Card.Header>

                        <Card.Body>
                            {
                                (PersonalDatas.length)?
                                PersonalDatas.map(this.RenderPersonalData)
                                :
                                <CenteredSpinner />
                            }
                        </Card.Body>
                    </Card>
                    :
                    <LoggedOutCard />
                }
            </div>
        );
    }
}

export default Profile;
