// Packages
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

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

    RenderPersonalData = ({rut, nombre, apellido, telefono, direccion, rol}) => (
        <div key={rut}>
            {rut}<br />
            {nombre} <br />
            {apellido} <br />
            {telefono} <br />
            {direccion} <br />
            <button onClick={this.RequireLogin.current.HandleLogout} className="btn btn-primary">Logout</button>
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
                            <Card.Text>
                                {
                                    (PersonalDatas.length)?
                                    PersonalDatas.map(this.RenderPersonalData)
                                    :
                                    <CenteredSpinner />
                                }
                            </Card.Text>
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
