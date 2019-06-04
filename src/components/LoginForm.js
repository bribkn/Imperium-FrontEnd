import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// dejar esto solo como el formulario
// agregar un loginhandler???
// agregar un loginrequire

class LoginForm extends Component{
    constructor(props, context){
        super(props, context);

        this.SwapLoginModal = this.SwapLoginModal.bind(this);
        this.SaveSession = this.SaveSession.bind(this);
        this.ResetLogIn = this.ResetLogIn.bind(this);

        this.host = "http://localhost:8000";
        this.state = {
            submitted: false,
            show: true,
            UserLoggedIn: false,
            fetchedUser: []
        }
    }

    componentDidMount(){
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
    }

    ResetLogIn(){
        localStorage.removeItem('UserLoggedIn');
        this.setState({ UserLoggedIn: 'false' });
    }

    SwapLoginModal() {
        var CurrentShowState = this.state.show;
        this.setState({ show: !CurrentShowState });
    }

    SaveSession(){
        var CurrentFetchedUser = this.state.fetchedUser;

        if ( typeof( CurrentFetchedUser ) !== 'undefined' ) {
            console.log('Encontramos coincidencia en DB, logeandote.');
            localStorage.setItem('UserLoggedIn', 'true');
        }else{
            console.log('Las credenciales no corresponden. uwu');
            this.SwapLoginModal();
        }
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        var rut = event.target[0].value;
        var password = event.target[1].value;

        if ( rut === '' || password === '' ) {
            this.setState({ submitted: false });
        }else{
            fetch(this.host+`/login?rut=${rut}&password=${password}`)
            .then(response => response.json())
            .then(resp => this.setState({ fetchedUser: resp.data[0]} ))
            .then(r => this.SaveSession() )
            .catch(err => console.error(err))

            this.setState({ submitted: true });
            this.SwapLoginModal();
        }
    }

    render(){
        const { UserLoggedIn } = this.state;

        return(
            <div>
                <Modal show={this.state.show} onHide={this.SwapLoginModal} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Oops!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            ( UserLoggedIn === 'true' )?
                            <div>
                                <p>Saludos, señor logeado.</p>
                            </div>
                            :
                            <div>
                                <p>Parece ser que no has iniciado sesión aún.</p><hr />

                                <form id="LoginForm" onSubmit={this.HandleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="rut">RUT</label>
                                            <input placeholder="11.111.111-1" id="rut" name="rut" type="text" className="form-control" />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="password">Contraseña</label>
                                            <input placeholder="*******" id="password" name="password" type="password" className="form-control" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        <button form="LoginForm" type="submit" className="btn btn-primary">Iniciar sesión</button>
                        <button onClick={this.ResetLogIn} className="btn btn-primary">Reset</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default LoginForm;
