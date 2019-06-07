import React, { Component } from 'react';
import RequireLogin from '../components/RequireLogin';
import Block from '../components/Block';
import Checkbox from '../components/Checkbox';

import '../App.css';
import '../css/Dashboard.css';
import '../css/Checkbox.css';

class List extends Component {



    render() {
        return (
            <label>
                <Checkbox
                    title= "Brian Bastías"
                />
            </label>
        )
    }
}

export default List  ;
