import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

class Navigation extends Component{
    render(){
        return(
            <div className="nav-side-menu">
                <div className="brand">
                    <img className="brand-logo" src={ logo } alt="Logo"/> Imperium &nbsp; &nbsp;
                </div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        <li>
                            <Link to="/Dashboard">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Escritorio
                                </div>
                            </Link>
                        </li>

                        <li>
                            <Link to="/Profile">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Mi Perfil
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Notifications">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Notificaciones
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/StudentData">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Datos de alumnos
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Management">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Modificar datos alumnos
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/List">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Asistencia alumnos
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/RealtimeMap">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Mapa en tiempo real
                                </div>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;
