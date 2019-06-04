import React, { Component } from 'react';

class Block extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isShow: true,
        };
    }

    render(){
        return(
            <div className="blocks-container">
                <div className="info-block">
                    <div className="block-title">{this.props.title}</div><hr className="box-hr" />

                    <div className="block-body">{this.props.msg}</div>
                </div>
            </div>
        )
    }
}

export default Block;
