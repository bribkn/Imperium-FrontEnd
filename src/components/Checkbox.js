import React, { Component } from 'react';


// const Checkbox = props => (
//    <div className="checkbox-container">
//       <div className="info-checkbox">
//          <input type="checkbox" {...props} />
//       </div>
//    </div>
//
// )

class Checkbox extends Component{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div className="checkbox-container">
                <div className="info-checkbox">
                </div>
            </div>
        )
    }
}


export default Checkbox;
