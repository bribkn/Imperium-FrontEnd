import React, { Component } from 'react';
import {Button,ButtonGroup} from 'react-bootstrap'


class Checkbox extends Component{

    constructor(props){
        super(props);
        this.handleTrue = this.handleTrue.bind(this);
        this.handleFalse = this.handleFalse.bind(this);

        this.state ={
            checked: false
        }
    }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
        console.log("Cambiando ticket: %s", this.state.checked);
    }

    handleTrue(){
        this.setState({ checked: true })
    }

    handleFalse(){
        this.setState({ checked: false })
    }

    render(){
        return(
               <td>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="success" onClick={this.handleTrue} size="lg">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </Button>
                        <Button variant="danger" onClick = {this.handleFalse} size="lg">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </ButtonGroup>
                    <font size="4">{this.props.title}</font>
               </td>
        )
    }
}
        // &nbsp;

export default Checkbox;
