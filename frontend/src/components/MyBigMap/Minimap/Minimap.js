import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Minimap.css';

const Minimap = ({ map }) => {
    const minimapRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true); 

    useEffect(() => {
        const imageBounds = [
            [11, 0],
            [0, 10],
        ];

        if (map) {
            // Create the minimap
            const minimap = L.map(minimapRef.current, {
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                touchZoom: false,
            }).setView(map.getCenter(), 5);

            // Add the image to the minimap
            const imagePath = require('../../../assets/CACAPOUSSE-01.png');
            L.imageOverlay(imagePath, imageBounds).addTo(minimap);

            // Sync the main map and the minimap
            map.on('move', () => {
                minimap.setView(map.getCenter(), 5);
            });

            // Clean up the minimap when the component is unmounted
            return () => {
                minimap.remove();
            };
        }
    }, [map]);

    // Event listener for the "a" key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'a') {
                setIsVisible(!isVisible);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible]);

    return (
        <div ref={minimapRef} className='minimap-map' style={{display: isVisible ? 'block' : 'none' }}>
            <div className="minimap-marker"></div>  
            <p className="minimap-info">Press "a" to hide/show minimap</p>
        </div>
    );
};

export default Minimap;
