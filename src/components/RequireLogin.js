import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class RequireLogin extends Component{
    constructor(props, context){
        super(props, context);

        this.SwapLoginModal = this.SwapLoginModal.bind(this);
        this.SaveSession = this.SaveSession.bind(this);
        this.HandleLogout = this.HandleLogout.bind(this);

        this.URL = "http://imperium-be.herokuapp.com";
        // this.URL = "http://localhost:8000";

        this.state = {
            Submitted: false,
            Show: true,
            FetchedUser: [],
            UserLoggedIn: false,
            UserRUT: 0,
            UserName: '',
            UserNick: '',
            UserContact: '',
            UserAddress: '',
            UserRol: 0
        }
    }

    // This function gets called when the Modal is rendered
    componentDidMount(){
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') }, () => {
            if ( this.state.UserLoggedIn === 'true' )
                this.setState({ Show: false });
        });
        this.setState({ UserName: localStorage.getItem('UserName') });
    }

    // This function searchs the credentials in DB
    HandleLogin = (event) => {
        event.preventDefault();

        var rut = event.target[0].value.replace(/\D/g,'');
        var password = event.target[1].value;

        if ( rut === '' || password === '' ) {
            this.setState({ Submitted: false });
        }else{
            fetch(`${this.URL}/login?rut=${rut}&password=${password}`)
            .then(response => response.json())
            .then(resp => this.setState({ FetchedUser: resp.data[0]} ))
            .then(r => this.SaveSession() )
            .then(r => window.location.reload() ) // solucion feik, eliminar luego xd
            .catch(err => console.error(err))

            this.setState({ Submitted: true });
            this.SwapLoginModal();
        }
    }

    // This function resets Local Storage
    // Logging out the current user
    HandleLogout(){
        localStorage.removeItem('UserLoggedIn');
        localStorage.removeItem('UserRUT');
        localStorage.removeItem('UserName');
        localStorage.removeItem('UserNick');
        localStorage.removeItem('UserContact');
        localStorage.removeItem('UserAddress');
        localStorage.removeItem('UserRol');

        this.setState({ UserLoggedIn: 'false' });
        this.setState({ UserRUT: 0 });
        this.setState({ UserName: '' });
        this.setState({ UserNick: '' });
        this.setState({ UserContact: '' });
        this.setState({ UserAddress: '' });
        this.setState({ UserRol: 0 });

        this.props.UpdateData();
        this.SwapLoginModal();
    }

    // This callback function checks if the user matched DB
    // If so, saves the current session
    // If not, reopens the Login Modal
    SaveSession(){
        var CurrentFetchedUser = this.state.FetchedUser;

        if ( typeof( CurrentFetchedUser ) !== 'undefined' ) {
            console.log('Encontramos coincidencia en DB, logeandote.');
            localStorage.setItem('UserLoggedIn', 'true');
            localStorage.setItem('UserRUT', CurrentFetchedUser.rut);
            localStorage.setItem('UserName', CurrentFetchedUser.nombre+' '+CurrentFetchedUser.apellido);
            localStorage.setItem('UserNick', CurrentFetchedUser.nick);
            localStorage.setItem('UserContact', CurrentFetchedUser.telefono);
            localStorage.setItem('UserAddress', CurrentFetchedUser.direccion);
            localStorage.setItem('UserRol', CurrentFetchedUser.rol);
        }else{
            console.log('Las credenciales no corresponden.');
            this.SwapLoginModal();
        }

        this.props.UpdateData();
    }

    // This function helps Modal to be turn On/Off.
    SwapLoginModal() {
        var CurrentShowState = this.state.Show;
        this.setState({ Show: !CurrentShowState });
    }

    render(){
        const { UserLoggedIn } = this.state;
        const { UserName } = this.state;
        const { Show } = this.state;

        return(
            <div>
                <Modal show={Show} animation={true} backdrop={'static'} keyboard={false}>
                    <Modal.Header>
                        {
                            ( UserLoggedIn === 'true' )?
                            <Modal.Title>Bienvenido</Modal.Title>
                            :
                            <Modal.Title>Oops! Debes iniciar sesión</Modal.Title>
                        }
                    </Modal.Header>

                    <Modal.Body>
                        {
                            ( UserLoggedIn === 'true' )?
                            <p>Saludos, señor { UserName }.</p>
                            :
                            <form id="LoginForm" onSubmit={this.HandleLogin}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <center><label htmlFor="rut">RUT</label></center>
                                        <input placeholder="11.111.111-1" id="rut" name="rut" type="text" className="form-control" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <center><label htmlFor="password">Contraseña</label></center>
                                        <input placeholder="*******" id="password" name="password" type="password" className="form-control" />
                                    </div>
                                </div>
                            </form>
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            ( UserLoggedIn === 'true' )?
                            <div>
                                <button onClick={this.HandleLogout} className="btn btn-primary">Logout</button>
                                <button onClick={this.SwapLoginModal} className="btn btn-secondary">Cerrar</button>
                            </div>
                            :
                            <button form="LoginForm" type="submit" className="btn btn-primary">Iniciar sesión</button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default RequireLogin;
