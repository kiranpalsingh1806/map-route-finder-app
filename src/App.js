import { useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

import './App.css';

function App() {
    const mapElement = useRef()
    const [map, setMap] = useState({});
    const [longitude, setLongitude] = useState(75.706026);
    const [latitude, setLatitude] = useState(31.256052);

    const convertToPoints = (lngLat) => {
        return {
            point: {
                latitude: lngLat.lat,
                longitude: lngLat.lng
            }
        }
    }

    useEffect(() => {
        const origin = {
            lng: longitude,
            lat: latitude
        }

        let map = tt.map({
            key: process.env.REACT_APP_TOM_TOM_API_KEY,
            container: mapElement.current,
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true
            },
            center: [longitude, latitude],
            zoom: 16
        })

        setMap(map)

        const addMarker = () => {
            const popupOffset = {
                bottom: [0, -25]
            }

            const popup = new tt.Popup({ offset: popupOffset }).setHTML('This is you');
            const element = document.createElement('div')
            element.className = 'marker'
            const marker = new tt.Marker({
                draggable: true,
                element: element,
            })
                .setLngLat([longitude, latitude])
                .addTo(map);

            marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                setLongitude(lngLat.lng);
                setLatitude(lngLat.lat);
            })

            marker.setPopup(popup).togglePopup()
        }

        addMarker()

        // const pointsForDestinations = locations.map
        // const callParameters = {
        //     key: process.env.REACT_APP_TOM_TOM_API_KEY,
        //     destinations: pointsForDestinations,
        //     origins: [convertToPoints]
        // }

        // return new Promise((resolve, reject) => {
        //     ttapi.services
        //         .matrixRouting(callParameters)
        // })

        return () => map.remove()
    }, [longitude, latitude]);

    return (
        <>
            {
                map && <div className="app">
                    <div ref={mapElement} className="map" />
                    <div className='search-bar'>
                        <h1>Where to ?</h1>
                        <input
                            type="text"
                            id='longitude'
                            className='longitude'
                            placeholder='Put in Longitude...'
                            onChange={(e) => { setLongitude(e.target.value) }}
                        />
                        <input
                            type="text"
                            id='latitude'
                            className='latitude'
                            placeholder='Put in latitude...'
                            onChange={(e) => { setLatitude(e.target.value) }}
                        />
                    </div>
                </div >}
        </>
    );
}

export default App;
