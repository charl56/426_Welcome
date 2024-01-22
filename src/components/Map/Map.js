// React & Leaflet
import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Popup
import Popup from './Popup/Popup';
// Css
import './Map.css';
// Data
import { projectsPoints } from '../../datas/projects'



const CustomMap = () => {
    const mapRef = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupProject, setPopupProject] = useState("");       // Hook to watch for changes in popupProject
    useEffect(() => {
        if (popupProject) {
            setPopupOpen(true);
        }
    }, [popupProject]);


    useEffect(() => {
        // Initial coordinates and zoom level.
        const initialCoordinates = [5, 5];
        const initialZoom = 6;

        const imageBounds = [
            [10, 0],  // Top-left corner coordinates of the image.
            [0, 10],  // Bottom-right corner coordinates of the image.
        ];

        // Create a Leaflet map.
        const map = L.map(mapRef.current, {
            minZoom: 6,
            maxZoom: 8,
            maxBounds: imageBounds,
            maxBoundsViscosity: 0.5, // Makes exceeding the bounds more resistant.
            zoomControl: false,
            attributionControl: false
        }).setView(initialCoordinates, initialZoom);

        // Add your custom image as a background layer.
        const imagePath = require('../../assets/426.png');  // Replace this with the correct path to your image.

        L.imageOverlay(imagePath, imageBounds).addTo(map);

        // Add markers for points.

        projectsPoints.forEach(point => {
            const marker = L.marker(point.coordinates, {
                icon: L.icon({
                    iconUrl: require('../../assets/icons/' + point.iconUrl),  // Replace this with the correct path to your icon.
                    iconSize: point.iconSize,
                    iconAnchor: point.iconAnchor,
                    popupAnchor: point.popupAnchor
                }),
                title: point.title
            }).on('click', markerOnClick).addTo(map);
        });


        function markerOnClick(e) {
            const projectTitle = e.sourceTarget.options.title;
            console.log(projectTitle);
            setPopupProject(projectTitle);
        }

        // Clean up the map or other resources when the component is unmounted.
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <div ref={mapRef} />
            <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} title={popupProject} />
        </div>
    )
};

export default CustomMap;
