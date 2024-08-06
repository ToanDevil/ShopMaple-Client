import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '230px',
};

const MyMapComponent = ({ center = { lat: 10.8231, lng: 106.6297 } }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDr0M60tbwVkjdpUs0sCquf2Q2SqOR5Omc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyMapComponent);
