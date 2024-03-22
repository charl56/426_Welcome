import React, { useEffect, useRef } from "react";
import '../../libs/leaflet-html-overlay'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import $ from 'jquery';
import './MyBigMap.css';
import VinylVase from './VinylVase/VinylVase'
import Jukebox from './Jukebox/Jukebox'
import RfidReader from "./RfidReader/RfidReader";

const MyBigMap = ({ onLoadingComplete }) => {
    const mapRef = useRef();

    useEffect(() => {
        if (document.getElementById('map').childElementCount === 0) {
            const imageBounds = [
                [11, 0],
                [0, 10],
            ];
            const initialCoordinates = [5, 5];
            const initialZoom = 8;

            var map = L.map('map', {
                minZoom: 6,
                maxZoom: 9,
                maxBounds: imageBounds,
                maxBoundsViscosity: 1,
                zoomControl: true,
                attributionControl: false,
                boxZoom: false,
                doubleClickZoom: false,
                touchZoom: false,
            });

            map.whenReady(() => {
                onLoadingComplete();
            });


            // map.on('load', () => {
            //     console.log("load map")
            //     setIsMapLoaded(true);
            // });

            // Add custom image as a background layer.
            const imagePath = require('../../assets/CACAPOUSSE-01.png');
            L.imageOverlay(imagePath, imageBounds).addTo(map);

            // const imageSvg = require('../../assets/APP426.svg');  // Replace this with the correct path to your image.
            // L.svgOverlay(imageSvg, imageBounds).addTo(map);


            $('.groupe1').htmlOverlay().addTo(map);
            $('.groupe2').htmlOverlay().addTo(map);
            $('.groupe3').htmlOverlay().addTo(map);
            map.setView(initialCoordinates, initialZoom);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [onLoadingComplete]);

    return (
        <div className="map__big--screen">
            <div id="map"></div>
            {/* posY, poxX */}
            <div className="groupe1" data-pos="5.7, 5.4">
                <VinylVase />
            </div>
            <div className="groupe2" data-pos="6.05, 4.2">
                <Jukebox />
            </div>
            <div className="groupe3" data-pos="11, 1">
                <RfidReader />
            </div>
        </div>
    );
};

export default MyBigMap