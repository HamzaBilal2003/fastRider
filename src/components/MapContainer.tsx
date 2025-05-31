import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '50vh',
  borderRadius: '10px'
};

// const center = {
//   lat: 40.73061, // Default center (e.g., NYC)
//   lng: -73.935242
// };

type Props = {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
};

const MapContainer: React.FC<Props> = ({ origin, destination }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao', // Directly add the API key here
    libraries: ['places']
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error('Error fetching directions', result);
        }
      }
    );
  }, [origin, destination]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origin}
      zoom={13}
      onLoad={onLoad}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapContainer;
