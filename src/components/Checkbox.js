import React, { Component } from 'react';

class Checkbox extends Component{

    constructor(props){
        super(props);

        this.state ={
            checked: false
        }
    }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
        console.log("Cambiando ticket: %s", this.state.checked);
    }

    render(){
        return(
            <div className="checkbox-container">
               <div className="info-checkbox">
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange} />
                    {this.props.title}
               </div>
            </div>
        )
    }
}


export default Checkbox;
