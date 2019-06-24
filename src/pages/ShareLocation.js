// Components
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, Card } from 'react-bootstrap';

// Utility components
import PageTitle from '../components/utility/PageTitle';
import AlertsHandler from '../components/utility/AlertsHandler';
import RequireLogin from '../components/RequireLogin';

// CSS
import '../css/Map.css';

// Images
import cross from '../images/cross.png';
import ticket from '../images/ticket.png';

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
        this.UploadLocationToServer = this.UploadLocationToServer.bind(this);
        this.RequireLogin = React.createRef();

        // this.URL = "http://localhost:8000";
        this.URL = "https://imperium-be.herokuapp.com";

        this.state = {
            myCurrentCenter: {
                lat: 0,
                lng: 0,
                UserLoggedIn: false,
                UserRUT: 0,
                UserName: '',
                UserNick: '',
                UserContact: '',
                UserAddress: '',
                UserRol: '',
                isSendingData: false
            }
        }
    }

    componentDidMount(){
        setTimeout(this.GetGeoLocation.bind(this), 500)
        this.UpdateData();
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchId);
    }

    SwapSendingData = (event) => {
        var CurrentSendingDataState = this.state.isSendingData;
        this.setState({ isSendingData: !CurrentSendingDataState });
    }

    UpdateData(){
        this.setState({ UserRUT: localStorage.getItem('UserRUT') }, () => {
            this.GetPersonalData();
        })
        this.setState({ UserLoggedIn: localStorage.getItem('UserLoggedIn') })
        this.setState({ UserName: localStorage.getItem('UserName') })
        this.setState({ UserNick: localStorage.getItem('UserNick') })
        this.setState({ UserContact: localStorage.getItem('UserContact') })
        this.setState({ UserAddress: localStorage.getItem('UserAddress') })
        this.setState({ UserRol: localStorage.getItem('UserRol') })
    }

    GetPersonalData = _ => {
        var FetchURL = `${this.URL}/users/search?rut=${this.state.UserRUT}`;

        fetch(FetchURL)
        .then(response => response.json())
        .then(resp => this.setState({ PersonalDatas: resp.data }))
        .catch(err => console.error(err))
    }

    GetGeoLocation = () => {
        if (navigator.geolocation) {
            this.watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    this.setState({
                        myCurrentCenter: { lat: pos.coords.latitude, lng: pos.coords.longitude}
                    }, () => {
                        this.UploadLocationToServer();
                    })
                },
                (error) => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
            )
        }
    }

    UploadLocationToServer(){
        if ( this.state.isSendingData ) {
            var fecha = new Date()
            fecha.setHours(fecha.getHours() - 4);
            fecha = fecha.toISOString().slice(0,19).replace('T',' ');
            var UploadURL = `${this.URL}/subirlltio?rut_tio=${this.state.UserRUT}&fecha=${fecha}&latitud=${this.state.myCurrentCenter.lat}&longitud=${this.state.myCurrentCenter.lng}`;

            // console.log(`Publicando tu ubicación`);
            console.log(UploadURL);

            // this.AlertsHandler.generate('success', 'Wow!', 'Enviando tu ubicación actual.');

            fetch(UploadURL)
            .then(response => response.json())
            .catch(err => console.error(err))
        }else{
            console.log(`No estás compartiendo la ubicación`);
            // this.AlertsHandler.generate('danger', 'Error!', 'Tu ubicación cambió, pero no la estás enviando.');
        }
    }

    render() {
        const { isSendingData } = this.state;

        return (
            <div>
                <RequireLogin UpdateData = {this.UpdateData} ref={this.RequireLogin}/>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                <PageTitle text="Mapa en tiempo real" />
                {
                    (isSendingData === true)?
                    <Card bg="success" text="white">
                        <Card.Header as="h5">
                            {
                                (isSendingData === true)?
                                <div><img className='brand-logo' src={ ticket } alt='Compartiendo'/> Estás compartiendo tu ubicación</div>:
                                <div><img className='brand-logo' src={ cross } alt='No compartiendo'/> No estás compartiendo tu ubicación</div>
                            }
                        </Card.Header>

                        <Card.Body>
                            <div className="map-div">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyA6MB76H0PzRXkHTCmJwQmJX5_dyPZ8m3A' }}
                                    defaultZoom={ this.props.zoom }
                                    center={ this.state.myCurrentCenter }
                                >
                                    <AnyReactComponent
                                        lat={ this.state.myCurrentCenter.lat }
                                        lng={ this.state.myCurrentCenter.lng }
                                        text="Yo"
                                    />
                                </GoogleMapReact>
                            </div>
                        </Card.Body>

                        <Card.Footer style={{'textAlign':'center'}} className="text-muted"><Button variant="primary" onClick={this.SwapSendingData}>Compartir ubicación</Button></Card.Footer>
                    </Card>
                    :
                    <Card bg="danger" text="white">
                        <Card.Header as="h5">
                            {
                                (isSendingData === true)?
                                <div><img className='brand-logo' src={ ticket } alt='Compartiendo'/> Estás compartiendo tu ubicación</div>
                                :
                                <div><img className='brand-logo' src={ cross } alt='No compartiendo'/> No estás compartiendo tu ubicación</div>
                            }
                        </Card.Header>

                        <Card.Body>
                            <div className="map-div">
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyA6MB76H0PzRXkHTCmJwQmJX5_dyPZ8m3A' }}
                                    defaultZoom={ this.props.zoom }
                                    center={ this.state.myCurrentCenter }
                                >
                                    <AnyReactComponent
                                        lat={ this.state.myCurrentCenter.lat }
                                        lng={ this.state.myCurrentCenter.lng }
                                        text="Yo"
                                    />
                                </GoogleMapReact>
                            </div>
                        </Card.Body>

                        <Card.Footer style={{'textAlign':'center'}} className="text-muted">
                            <Button variant="primary" onClick={this.SwapSendingData}>Cambiar estado</Button>
                        </Card.Footer>
                    </Card>
                }
            </div>
        );
    }
}

export default ShareLocation;
