// React
import React, { useEffect, useRef } from "react";
import './VinylVase.css'
import { emit } from "../../../libs/eventBus";

// Img
import logo1 from './images/laylow.jpg'
import logo2 from './images/lomepal.jpg'
import logo3 from './images/oboy.jpg'

function VinylVase() {

    /***** Datas for Vinyl component *****/
    const vinyls = {                 // Links of vinyls
        laylow: "https://www.youtube.com/embed/tYgZtKuuzOE",
        lomepal: "https://www.youtube.com/embed/okbyUVi_Of0",
        oboy: "https://www.youtube.com/embed/1VLSjLJWPRE"
    };
    // Add event click
    function addEventListener() {
        for (let i = 1; i <= 3; i++) {
            const vinylElement = document.querySelector(`.vinyl-${i}`);
            vinylElement.addEventListener('click', () => handleVinylClick(i));
        }
    }
    // Remove event click
    function removeEventListener() {
        for (let i = 1; i <= 3; i++) {
            const vinylElement = document.querySelector(`.vinyl-${i}`);
            vinylElement.removeEventListener('click', () => handleVinylClick(i));
        }
    }
    function handleVinylClick(pos) {
        const artist = document.querySelector(`.vinyl-${pos}`).getAttribute('id');
        // Envoie de données au lecteur
        emit('player.link', { link: vinyls[artist] });
    }


    /***** Functions for Vinyl component *****/
    const vinylRef = useRef(null);
    useEffect(() => {
        if (vinylRef.current) {
            addEventListener();

            return () => {
                removeEventListener();
            };
        }
    });


    return (
        <div ref={vinylRef} className='pol-room-div'>
            <img src={logo1} alt='vinyl' id="laylow" className='vinyl__disc vinyl-1' />
            <img src={logo2} alt='vinyl' id="lomepal" className='vinyl__disc vinyl-2' />
            <img src={logo3} alt='vinyl' id="oboy" className='vinyl__disc vinyl-3' />
        </div>
    );
}

export default VinylVase;