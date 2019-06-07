import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component{
    render(){
        return(
            <div className="nav-side-menu">
                <div className="brand">Imperium</div>
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
                            <Link to="/StudentData">
                                <div className="button-wrapper">
                                    <i className="fa fa-book fa-fw"></i>Datos de alumnos
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
