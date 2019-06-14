import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class LoggedOutCard extends Component {
    render() {
        return (
            <Card bg="info" text="white">
                <Card.Header as="h5">Inicia sesión</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Debes iniciar sesión antes de continuar.
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
export default LoggedOutCard;
