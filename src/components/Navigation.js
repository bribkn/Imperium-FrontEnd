import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGlobe, faTachometerAlt, faUsers, faIdCard, faBell, faInfoCircle, faDatabase } from '@fortawesome/free-solid-svg-icons'

import logo from '../images/logo.png';

class Navigation extends Component{
    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);

        // this.URL = "http://localhost:8000";
        this.URL = "https://imperium-be.herokuapp.com";

        this.state = {
            UserRol: 0
        }
    }

    componentDidMount(){
        this.UpdateData();
    }

    UpdateData(){
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    render(){
        const { UserRol } = this.state;

        return(
            <div className="nav-side-menu">
                <div className="brand">
                    <img className="brand-logo" src={ logo } alt="Logo"/> Imperium &nbsp; &nbsp;
                </div>

                <FontAwesomeIcon className='toggle-btn' icon={faBars} fixedWidth data-toggle="collapse" data-target="#menu-content" />

                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">

                        {
                            (UserRol === '0' || UserRol === '1' || UserRol === '2' || UserRol === '3' || UserRol === '10' )?
                            /*<li>
                                <Link to="/Dashboard">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faTachometerAlt} fixedWidth /> Escritorio
                                    </div>
                                </Link>
                            </li>:
                            <div></div>*/
                        }

                        {
                            (UserRol === '0' || UserRol === '1' || UserRol === '2' || UserRol === '3' || UserRol === '10' )?
                            <li>
                                <Link to="/Profile">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faIdCard} fixedWidth /> Mi Perfil
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }

                        {
                            (UserRol === '0' || UserRol === '1' || UserRol === '2' || UserRol === '3' || UserRol === '10' )?
                            <li>
                                <Link to="/Notifications">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faBell} fixedWidth /> Notificaciones
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }

                        {
                            (UserRol === '2' || UserRol === '10')?
                            <li>
                                <Link to="/StudentData">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faInfoCircle} fixedWidth /> Datos de alumnos
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }

                        {
                            (UserRol === '2' || UserRol === '10')?
                            <li>
                                <Link to="/Management">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faDatabase} fixedWidth /> Modificar datos alumnos
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }

                        {
                            (UserRol === '2' || UserRol === '10')?
                            <li>
                                <Link to="/List">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faUsers} fixedWidth /> Asistencia alumnos
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }

                        {
                            (UserRol === '2' || UserRol === '10')?
                            <li>
                                <Link to="/ShareLocation">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faGlobe} fixedWidth /> Compartir ubicación
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }

                        {
                            (UserRol === '1' || UserRol === '10')?
                            <li>
                                <Link to="/ViewLocation">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faGlobe} fixedWidth /> Ver ubicación
                                    </div>
                                </Link>
                            </li>:
                            <div></div>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;
