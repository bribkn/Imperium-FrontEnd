import React, { Component } from 'react';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap'

import AlertsHandler from './utility/AlertsHandler';

class Checkbox extends Component{

    constructor(props){
        super(props);
        this.HandleChecked = this.HandleChecked.bind(this);
        this.HandleUnchecked = this.HandleUnchecked.bind(this);
        this.HandleMissing = this.HandleMissing.bind(this);
        this.HandleFault = this.HandleFault.bind(this);
        this.HandleConfirm = this.HandleConfirm.bind(this);
        this.HandleCancel = this.HandleCancel.bind(this);
        this.ToggleHidden = this.ToggleHidden.bind(this);
        this.ToggleShow = this.ToggleShow.bind(this);

        this.state ={
            checked: "unchecked",
            hidden: false,
            show: false,
        }
    }

    HandleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
        console.log("Cambiando estado alumno: %s", this.state.checked);
    }

    ToggleHidden(){
        this.setState({ hidden: !this.state.hidden})
    }
    ToggleShow(){
        this.setState({ show: !this.state.show})
    }

    HandleChecked(){
        this.setState({ checked: "checked"})  //Si vino
    }

    HandleFault(){ //Si no vino
        this.ToggleShow()
    }

    HandleUnchecked(){
        this.setState({ checked: "unchecked" }) // Estado inicial
    }

    HandleMissing(){
        this.setState({ checked: "missing"}) // Vagabundos
    }
    HandleCancel(){ //Cancelar confirmacion
        this.ToggleShow()
        this.setState({ checked: "unchecked"})
        this.AlertsHandler.generate('danger', 'Oow!', 'Cancelaste el cambio de estado del alumno.');
    }
    HandleConfirm(){ //Aceptar confirmacion
        this.ToggleShow()
        this.ToggleHidden()
        this.setState({ checked: "fault"}) //Si no vino
        this.AlertsHandler.generate('success', 'Wow!', 'Se ha cambiado el estado del alumno.');
    }

    render(){
        const { hidden } = this.state
        const { show } = this.state

        console.log("Cambiando estado alumno %d: %s",this.props.id, this.state.checked);
        console.log("Cambiando confirmacion alumno %d:",this.props.id, this.state.show);

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                <Modal show={show} animation={true} backdrop={'static'} keyboard={false}>
                    <Modal.Header>
                        {
                            ( show === true )?
                            <Modal.Title>Confirmación</Modal.Title>
                            :
                            <div></div>
                        }
                    </Modal.Header>

                    <Modal.Body>
                        {
                            ( show === true )?
                            <p>¿Está seguro que desea marcar como ausente?</p>
                            :
                            <div></div>
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            ( show === true )?
                            <div>
                                <button onClick={this.HandleConfirm} className="btn btn-primary">Confirmar</button>
                                &nbsp;
                                <button onClick={this.HandleCancel} className="btn btn-secondary">Cerrar</button>
                            </div>
                            :
                            <div></div>
                        }
                    </Modal.Footer>
                </Modal>

                {
                    (hidden ===  false)?
                    <Container>
                        <Row>
                            <Col>
                                <div className="student-name">
                                    <strong>
                                        { this.props.name }
                                    </strong>
                                </div>
                            </Col>

                            <Col>
                                <Button variant="success" onClick={this.HandleChecked} size="lg">
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                </Button>

                                <Button variant="danger" onClick={this.HandleFault}  size="lg">
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </Button>

                                <Button variant="primary" onClick = {this.HandleMissing} size="lg">
                                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div></div>
                }

            </div>

        )
    }
}
export default Checkbox;
