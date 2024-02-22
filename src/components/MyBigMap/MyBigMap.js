import React, { useEffect, useRef, useState } from "react";// Libs for leaflet & Co
import '../../libs/leaflet-html-overlay'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import $ from 'jquery';
// CSS
import './MyBigMap.css';
// Components
import VinylVase from './VinylVase/VinylVase'
import Jukebox from './Jukebox/Jukebox'


const MyBigMap = React.memo(({ onLoadingComplete }) => {

    const [isMapLoaded, setIsMapLoaded] = useState(false);


    const mapRef = useRef();
    useEffect(() => {
        if (document.getElementById('map').childElementCount === 0) {

            // draggable layers for dev process
            const imageBounds = [
                [11, 0],  // Top-left corner coordinates of the image.
                [0, 10],  // Bottom-right corner coordinates of the image.
            ];
            const initialCoordinates = [5, 5];
            const initialZoom = 8;

            // Create map
            var map = L.map('map', {
                minZoom: 6,
                maxZoom: 9,
                maxBounds: imageBounds,
                maxBoundsViscosity: 1, // Makes exceeding the bounds more resistant.
                zoomControl: true,     // Hide +/- btns
                attributionControl: false,  // Hide "laeflet ..."
                boxZoom: false,         // Desactive shit+click to zoom
                doubleClickZoom: false,  // Desactive double click to zoom on map
                touchZoom: false,       // Desactive zoom on smartphone
            })

            console.log("load map before")
            map.whenReady(() => {
                console.log("ready")
                setIsMapLoaded(true);

            })

            // map.on('load', () => {
            //     console.log("load map")
            //     setIsMapLoaded(true);
            // });

            // Add custom image as a background layer.
            const imagePath = require('../../assets/CACAPOUSSE-01.png');  // Replace this with the correct path to your image.
            L.imageOverlay(imagePath, imageBounds).addTo(map);
            // const imageSvg = require('../../assets/APP426.svg');  // Replace this with the correct path to your image.
            // L.svgOverlay(imageSvg, imageBounds).addTo(map);

            // Add divs to map
            $('.groupe1').htmlOverlay().addTo(map);
            $('.groupe2').htmlOverlay().addTo(map);

            map.setView(initialCoordinates, initialZoom);

          
        }


        return () => {

            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };

    }, []); // Le tableau vide indique que cet effet doit être exécuté une seule fois après le premier rendu.

    useEffect(() => {
        if (isMapLoaded) {
            console.log("onLoadingcomplet")
            onLoadingComplete();
        }
    }, [isMapLoaded, onLoadingComplete]);

    return (
        <div className="map__big--screen">
            <div id="map"></div>
            <div className="groupe1" data-pos="5.8, 5.4">
                <VinylVase />
            </div>
            <div className="groupe2" data-pos="6.1, 4.25">
                <Jukebox />
            </div>
        </div>
    );
});

export default MyBigMap;