import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService
} from '@react-google-maps/api';
import { useRef, useEffect, useState } from 'react';
import { modeNightStyle, modeDayStyle } from './styles/MapNightMode';
import Loading from './Loading';
import HomeIcon from '../icons/HomeIcon.png';

const Map = (props) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState(null);
  const [centre, setCentre] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [messageError, setMessage] = useState('');
  const getOrigin = useRef('');
  const getDestination = useRef('');

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        setLocation();
      } else {
        setError(true);
        setMessage('You need to allow your browser access to your location');
      }
    });
  }, []);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCentre({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setOrigin({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLoading(false);
    });
  };

  const onClick = () => {
    if (getOrigin.current.value === '') {
      setOrigin(centre);
    } else {
      setOrigin(getOrigin.current.value);
    }
    setDestination(getDestination.current.value);
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log(response, 'response');
      }
    }
  };

  return (
    <div className='map'>
      {hasError && <p>{messageError}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <div className='map-container'>
          <GoogleMap
            id='direction-example'
            mapContainerStyle={{
              height: '150px',
              width: '100%'
            }}
            zoom={13}
            center={centre}
            options={
              props.theme === 'light'
                ? { styles: modeDayStyle }
                : { styles: modeNightStyle }
            }
          >
            <Marker position={centre} />
            {destination !== '' && origin !== '' && (
              <DirectionsService
                options={{ destination, origin, travelMode: 'WALKING' }}
                callback={directionsCallback}
              />
            )}
            {response !== null && (
              <DirectionsRenderer options={{ directions: response }} />
            )}
          </GoogleMap>
        </div>
      )}
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input
                id='ORIGIN'
                className='form-control'
                type='text'
                ref={getOrigin}
                placeholder='current location'
              />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input
                id='DESTINATION'
                className='form-control'
                type='text'
                ref={getDestination}
              />
            </div>
          </div>
        </div>

        <button className='btn btn-primary' type='button' onClick={onClick}>
          Build Route
        </button>
      </div>
    </div>
  );
};

export default Map;