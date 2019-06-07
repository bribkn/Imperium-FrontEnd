import React, { Component } from 'react';
import RequireLogin from '../components/RequireLogin';
import Block from '../components/Block';
import Checkbox from '../components/Checkbox';

import '../App.css';
import '../css/Dashboard.css';
import '../css/Checkbox.css';

class List extends React.Component {
   state = { checked: false }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
    }

    render() {
        return (
            <label>
                <span style={{ marginLeft: 8 }}>Brian Bastías</span>
                <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleCheckboxChange}
                />
                <span style={{ marginLeft: 8 }}>Brian Bastías</span>
            </label>
        )
    }
}

export default List  ;
