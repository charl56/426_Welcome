import React, { useEffect, useRef } from "react";// Libs for leaflet & Co
import '../../libs/leaflet-html-overlay'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import $ from 'jquery';
// CSS
import './MyMap.css';
// Components
import VinylVase from './VinylVase/VinylVase'
import Jukebox from './Jukebox/Jukebox'


const MyMap = React.memo(({ onLoadingComplete }) => {


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
                maxZoom: 10,
                maxBounds: imageBounds,
                maxBoundsViscosity: 1, // Makes exceeding the bounds more resistant.
                zoomControl: false,     // Hide +/- btns
                attributionControl: false,  // Hide "laeflet ..."
                boxZoom: false,         // Desactive shit+click to zoom
                doubleClickZoom: false,  // Desactive double click to zoom on map
                touchZoom: false,       // Desactive zoom on smartphone
            }).setView(initialCoordinates, initialZoom);

            // Add custom image as a background layer.
            const imagePath = require('../../assets/CACA-01.png');  // Replace this with the correct path to your image.
            L.imageOverlay(imagePath, imageBounds).addTo(map);
            // const imageSvg = require('../../assets/APP426.svg');  // Replace this with the correct path to your image.
            // L.svgOverlay(imageSvg, imageBounds).addTo(map);

            // Add divs to map
            $('.groupe1').htmlOverlay().addTo(map);
            $('.groupe2').htmlOverlay().addTo(map);

        }

        const handleLoad = () => {
            console.log("charge la map")
            onLoadingComplete();
            // Vous pouvez  ici exécuter du code supplémentaire qui nécessite que la page soit complètement chargée
        };
        window.addEventListener('load', handleLoad);


        return () => {
            window.removeEventListener('load', handleLoad);

            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };

    }, []); // Le tableau vide indique que cet effet doit être exécuté une seule fois après le premier rendu.


    return (
        <div>
            {/* Map */}
            <div id="map"></div>
            <div className="groupe1" data-pos="5.3, 5.1">
                <VinylVase />
            </div>
            <div className="groupe2" data-pos="5.54, 4.13">
                <Jukebox />
            </div>
        </div>
    );
});

export default MyMap;