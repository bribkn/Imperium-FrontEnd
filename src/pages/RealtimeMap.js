// Components
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// Utility components
import PageTitle from '../components/utility/PageTitle';

// CSS
import '../css/RealtimeMap.css';

class RealtimeMap extends Component {
    static defaultProps = {
        center: {
            lat: -33.452515,
            lng: -70.660553
        },
        zoom: 18
    };

    render() {
        return (
            <div>
                <PageTitle text="Mapa en tiempo real" />

                <div className="map-div">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyA6MB76H0PzRXkHTCmJwQmJX5_dyPZ8m3A' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default RealtimeMap;
