import React, { Component } from 'react';
import Block from '../components/Block';
import Map from '../components/Map';

import '../App.css';

class Test extends Component {
    constructor(props, context){
        super(props, context);
    }

    render() {
        return (
            <Map />
        )
    }
}

export default Test;
