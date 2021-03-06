// Components
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Card } from 'react-bootstrap';

// Utility components
import PageTitle from '../components/utility/PageTitle';
import CenteredSpinner from '../components/utility/CenteredSpinner';

// CSS
import '../css/Map.css';

const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'green',
        padding: '10px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        borderStyle: 'solid',
        borderColor: 'white',
        transform: 'translate(-50%, -50%)'
        }}>
        {text}
    </div>
);

class ShareLocation extends Component {
    static defaultProps = {
        center: {
            lat: -33.452515,
            lng: -70.660553
        },
        zoom: 18
    };

    constructor(props, context){
        super(props, context);

        this.UpdateData = this.UpdateData.bind(this);
        this.Timer = this.Timer.bind(this)
        this.RequireLogin = React.createRef();

        // this.URL = "http://localhost:8000";
        this.URL = "https://imperium-be.herokuapp.com";
        this.intervalId = 0;

        this.state = {
            UserLoggedIn: false,
            UserRUT: 0,
            UserName: '',
            UserNick: '',
            UserContact: '',
            UserAddress: '',
            UserRol: '',
            tioCurrentData: {
                id: 0,
                lat: -33.452515,
                lng: -70.660553,
                fecha: ''
            },
            currentCount: 5,
            RutTio: 0,
            isSendingData: false,
            PositionFetchDone: false,
            UTC: ''
        }
    }

    componentDidMount(){
        this.UpdateData();
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    Timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })

        if(this.state.currentCount < 1) {
            this.setState({ currentCount: 5 })
            // clearInterval(this.intervalId);
            // llama a la funcion constantemente
            this.GetGeoLocation();
        }
    }

    UpdateData(){
        this.setState({ UserRUT: localStorage.getItem('UserRUT') }, () => {
            this.GetTioRut();
        })
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    Clean (rut) {
        return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : ''
    }

    FormatRUT (rut) {
        rut = this.Clean(rut)

        var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
        for (var i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result
        }
        return result
    }

    GetTioRut = _ => {
        var FetchURL = `${this.URL}/notification/search?rut=${this.state.UserRUT}`;

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ RutTio: resp.data[0].rut}))
        .then(r => this.intervalId = setInterval(this.Timer.bind(this), 1000))
        .catch(err => console.error(err))
    }

    GetGeoLocation = () => {
        var FetchURL = `${this.URL}/obtenerlltio?rut_tio=${this.state.RutTio}`;

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ tioCurrentData: resp.data[0] }))
        .then(r => this.setState({ PositionFetchDone: true }))
        .catch(err => console.error(err))
    }

    render() {
        const { RutTio } = this.state;
        const { tioCurrentData } = this.state;
        const { PositionFetchDone } = this.state;

        return (
            <div>
                <PageTitle text="Mapa en tiempo real" />
                {
                    (PositionFetchDone === false)?
                    <CenteredSpinner />:
                    <Card bg="info" text="white">
                        <Card.Header as="h5">Ubicación del tío: { this.FormatRUT(RutTio.toString()) }</Card.Header>

                        <Card.Body>
                            <div className="map-div">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyA6MB76H0PzRXkHTCmJwQmJX5_dyPZ8m3A' }}
                                    defaultCenter={ this.props.center }
                                    defaultZoom={ this.props.zoom }
                                    center={ tioCurrentData }
                                >
                                    {
                                        (typeof tioCurrentData !== 'undefined')?
                                        <AnyReactComponent
                                            lat={ tioCurrentData.lat }
                                            lng={ tioCurrentData.lng }
                                            text="Tío"
                                        />
                                        :
                                        <AnyReactComponent
                                            lat={ this.props.center.lat }
                                            lng={ this.props.center.lng }
                                            text="No existen datos del tío"
                                        />
                                    }
                                </GoogleMapReact>
                            </div>
                        </Card.Body>

                        <Card.Footer>
                                {
                                (typeof tioCurrentData !== 'undefined')?

                                    `- Última actualización: hace ${(new Date().getTime() - new Date(tioCurrentData.fecha).getTime())/1000} segundos.`
                                :
                                '- No existen datos del tío'
                                }
                        </Card.Footer>
                    </Card>
                }
            </div>
        );
    }
}

export default ShareLocation;
