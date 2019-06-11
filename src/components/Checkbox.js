import React, { Component } from 'react';
import {ButtonGroup,ToggleButton} from 'react-bootstrap'


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
            <div>
                {
                    this.props.name
                }
                <ButtonGroup toggle className="mt-3">
                <ToggleButton type="radio" name="radio" defaultChecked value="1">
                    <i className="fa fa-check" aria-hidden="true"></i>
                </ToggleButton>
                <ToggleButton type="radio" name="radio" value="2">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </ToggleButton>
                <ToggleButton type="radio" name="radio" value="3">
                    <i class="fa fa-user-times" aria-hidden="true"></i>
                </ToggleButton>
                </ButtonGroup>
            </div>

        )
    }
}
        // &nbsp;
        // <td>
        //      <ButtonGroup aria-label="Basic example">
        //          <Button variant="success" onClick={this.handleTrue} size="lg">
        //              <i className="fa fa-check" aria-hidden="true"></i>
        //          </Button>
        //          <Button variant="danger" onClick = {this.handleFalse} size="lg">
        //              <i className="fa fa-times" aria-hidden="true"></i>
        //          </Button>
        //      </ButtonGroup>
        //      <font size="4">{this.props.title}</font>
        // </td>

export default Checkbox;
