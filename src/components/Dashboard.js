import React, { Component } from 'react';
import '../css/Dashboard.css';

class Dashboard extends Component {
    constructor(props, context){
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="page-title">
                    <h1>Escritorio</h1>
                    <hr />
                </div>

                <div className="blocks-container">
                    pruebita1
                </div>
            </div>
        );
    }
}

export default Dashboard;
