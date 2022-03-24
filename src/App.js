import { useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import './App.css';

function App() {
    const mapElement = useRef()
    const [map, setMap] = useState({})
    const longitude = -0.112869;
    const latitude = 51.504;

    useEffect(() => {
        let map = tt.map({
            key: process.env.REACT_APP_TOM_TOM_API_KEY,
            container: mapElement.current,
            center: [longitude, latitude],
            zoom: 14
        })

        setMap(map)
    }, []);

    return (
        <div className="app">
            <div ref={mapElement} className="map"> </div>
        </div>
    );
}

export default App;
