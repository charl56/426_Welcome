import React, { useState, useEffect } from "react";
import mapImg from '../../assets/CACA-01.png'
import './Map33.css';
import '../../libs/leaflet-html-overlay'
import L from "leaflet";
import $ from 'jquery';

function MyMap() {

    var map;

    function centerMap() {
        map.setView();
        return false;
    }

    window.onload = function () {

        // draggable layers for dev process
        var dragMode = false;

        const imageBounds = [
            [11, 0],  // Top-left corner coordinates of the image.
            [0, 10],  // Bottom-right corner coordinates of the image.
        ];
        const initialCoordinates = [5, 5];
        const initialZoom = 7;



        map = L.map('map', {
            minZoom: 7,
            maxZoom: 10,
            maxBounds: imageBounds,
            maxBoundsViscosity: 0.5, // Makes exceeding the bounds more resistant.
            zoomControl: false,
            attributionControl: false
        }).setView(initialCoordinates, initialZoom);




        // L.tileLayer(
        //     mapImg, {
        //     } // l'url des tuiles openstreetmap
        // ).addTo(map);


        // Add divs to map
        $('.groupe1 .bloc').htmlOverlay().addTo(map);
        $('.groupe2 .bloc').htmlOverlay().addTo(map);


        // Add custom image as a background layer.
        const imagePath = require('../../assets/CACA-01.png');  // Replace this with the correct path to your image.
        L.imageOverlay(imagePath, imageBounds).addTo(map);
        // const imageSvg = require('../../assets/APP426.svg');  // Replace this with the correct path to your image.
        // L.svgOverlay(imageSvg, imageBounds).addTo(map);





        // dev tools
        map.on('zoomend', function () {
            console.log("zoom", map.getZoom());
        });
        if (!dragMode) {
            map.on('click', function (e) {
                console.log(e.latlng.lat + ', ' + e.latlng.lng);
            });
        }


    };


    return (
        <div>
            {/* Map */}
            <div id="map"></div>
            {/* Pol room div */}
            <div className="groupe1">
                <div id="bloc1" className="bloc wide" data-pos="5, 5">
                    <h3>Chambre Pol</h3>
                    <p>Vinyle-Vase</p>
                </div>
            </div>
            {/* Charles room div */}
            <div className="groupe2">
                <div id="bloc2" className="bloc wide" data-pos="5, 3">
                    <h3>Chambre Charles</h3>
                    <p>Jukebox</p>
                </div>
            </div>
        </div>
    );
}

export default MyMap;