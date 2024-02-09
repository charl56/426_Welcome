// React & Leaflet
import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VideoOverlay } from 'react-leaflet';
// Popup
import Popup from './Popup/Popup';
// Css
import './Map.css';
// Data
import { projectsPoints } from '../../datas/projects'
import * as ouai from '../../assets/APP426.svg'



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
            [11, 0],  // Top-left corner coordinates of the image.
            [0, 10],  // Bottom-right corner coordinates of the image.
        ];

        // Create a Leaflet map.
        const map = L.map(mapRef.current, {
            minZoom: 5,
            maxZoom: 10,
            maxBounds: imageBounds,
            maxBoundsViscosity: 0.5, // Makes exceeding the bounds more resistant.
            zoomControl: false,
            attributionControl: false
        }).setView(initialCoordinates, initialZoom);


        // Add your custom image as a background layer.
        const imagePath = require('../../assets/CACA-01.png');  // Replace this with the correct path to your image.
        // const imagePath = require('../../assets/APP426.svg');  // Replace this with the correct path to your image.
        console.log(imagePath);
        L.imageOverlay(imagePath, imageBounds).addTo(map);


        // var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        // svgElement.setAttribute('viewBox', "0 0 740.63 876.41");
        // svgElement.innerHTML = '<image width="180" height="213" transform="scale(4.11)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAADVCAYAAAD+ZdrNAAAACXBIWXMAAAsSAAALEgHS3X78AAAFO0lEQVR42u3dT4tVZQDH8d9jE00iGC0cm5VuEgVhgjAXgRO0KRB6B7loE7UIWrXytuoNhJFthALfgZsIdaVIC0EQg0gXgaMY6SKRsJ4W90rTNI53Zs4998/5fEAuzsw9c+a5X5557p1zzi1JLid5lOEcSLKS5EHGa3+SP5LcDaPQxuN8MMnNTbT3LLuSfF+S1CRvDXmnU0m+TXJpzAP+cZI/k5zW3ki08Th/neSrJFcb2t6JJPfnkqTWemGYe5RS7ia5NOzXj0opZXkz+82mx3fkj3Mp5XaSq019jydN7PDwMUsEjaBB0CBoEDQdVpLUWmv5zwdL+SDJN4Zny2qtdYcx3dDfm5xQ/zema8a3lyRzT/n8z0ku1lqXjfsWZolSqjFtZUwtObCGBkGDoEHQIGgEDYIGQYOgQdAIGgQNggZBI2gQNAgaBA2CRtAgaBA0CBoEjaBB0CBoEDQIGkGDoEHQIGgQNIIGQYOgQdAgaAQNggZBg6BB0AgaBA2CBkGDoBE0CBoEDYJG0CBoEDQIGgSNoEHQIGgQNAgaQYOgQdAgaBA0ggZBg6BB0CBoBA2CBkGDoEHQCBoEDYIGQYOgETQIGgQNgkbQIGgQNAgaBI2gQdAgaBA0CBpBg6BB0CBoEDSCBkHDuM0ZgtEopfTWfOjVJIfW+Xjbdid5PcmPg9sfzNBsxZ0kP03AfiwkObDq1gzNs9Vae5O4X6WU5SSLSU4nWZzU/Vxnv0+aofGkEAQNggZBg6ARNAgaBA2CBkEjaBA0CBqa4PDR7tqVZN8EnHBghqYR15JctuRg2i0kOZTkw4a3O59k76pbSw5atTfJ0SQ3Gtre0TX/XxE0bbiT5HqSM0n2NXUK1tq1eNOndjkFi04SNIIGQYOgQdAIGgQNggZBg6ARNEy5px2cNKqDv48kudKFgV1n7OaT1FrrZ7Jrf4beNaLv906Hx3pvkuOSG88MvZLk1igOAZyWK8Y3/XMOrpy/b4J2s+nfwsvpH1u9MolBd0op5c0OjsWe9M9eOdHQ9l5O8lqSh0luJ+kJeny+S3J/8K8rfkn/TYw+aXCbC4Nl5e+dnKEnaGZ8OHhgHze0P+enJOr7tdYLDT+mB7u85JiUmXF/ksNJPu3gTN2JJ4VtuZWk1/QssYVZ5UL6p/U3sj+llNrxrk4MngRbQzNyh5O8keRUklea3nittTeYIJp2XtCs51qSm+m/8eb7o/gGo/iNW0oZ6uv86bub7ia5muTBrP1ggkbQIGgQNAgaQcNs8Dp035H8+8L9+WFf89zAY0M6WUEvJDk0a29XsIErmYA/wTN9S46zhpxxzNB3klzvwtklmKFhsmfodQ71W0qyp4VDAPckWWrgSdg07MdS+md+08KSY+3SYneSxYz+vLDF9I/4em/M49DGfswneSS5FoKutS4bCqyhQdAgaBA0ggZBg6BB0LAxx0NPuVLKu+lfm29YS0leenK75vCGnbXWc1M9HulfVb5IY2qDrkkubuIu8+lffH1lcHtr1eeOTWoLpZQNO31y7L4Zejb0tnn/nbXWc7NwTT5BCzpJjg1+W1tDM37bPbhslq6W6lUOZooZmlE9iftisIxp9RhwMzSjcjz9V1EsOZgJ95KcSfJCWjz1TNDM1ExtDU0rM3UD71tz0gxN5wgaQYOgQdAgaAQNggZBg6BB0Agapty2zvoupXyZ5CPDSAse11qf36DFXrL9o+3uJfncmwthyQGCBkHTIXOrF9Rb8HaS+Ql4WzZYTnLjuSQHkvy2xY28mOSvJL8aT8bsUZIb/wDVwwklgvmrngAAAABJRU5ErkJggg=="/>';
        // var svgElementBounds = [[11, 0], [0, 10]];
        // L.svgOverlay(svgElement, svgElementBounds).addTo(map);

        // var divElement = document.getElementById('myDiv');
        // var myDivOverlay = L.DivOverlay().addTo(map);
        // myDivOverlay.setContent(divElement);
        // myDivOverlay.setLatLng([51.505, -0.09]);
        // myDivOverlay.show();

        // Add markers for points.

        projectsPoints.forEach(point => {
            L.marker(point.coordinates, {
                icon: L.icon({
                    iconUrl: require('../../assets/icons/' + point.iconUrl),  // Replace this with the correct path to your icon.
                    iconSize: point.iconSize,
                    iconAnchor: point.iconAnchor,
                    popupAnchor: point.popupAnchor
                }),
                title: point.title
            }).on('click', markerOnClick).addTo(map);
        });


        // projectsPoints.forEach(point => {
        //     const customDivIcon = L.divIcon({
        //         className: 'custom-div-icon',
        //         html: `<div>${point.title}</div>`,  // Contenu HTML de votre div
        //         iconSize: [30, 30],  // Taille de votre div
        //     });

        //     L.marker(point.coordinates, {
        //         icon: customDivIcon,
        //         title: point.title
        //     }).on('click', markerOnClick).addTo(map);
        // });


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
            <div id="myDiv">Hello world!</div>
            <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} title={popupProject} />
        </div>
    )
};

export default CustomMap;
