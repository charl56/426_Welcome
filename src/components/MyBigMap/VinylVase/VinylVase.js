// React
import React, { useEffect, useRef, useState, useContext } from "react";
import './VinylVase.css'
import { VinylPlayer } from './manageMusic'

// Img
import logo1 from './images/laylow.jpg'
import logo2 from './images/lomepal.jpg'
import logo3 from './images/oboy.jpg'

function VinylVase() {
    const vinylRef = useRef(null);        // Init placement of arms

    useEffect(() => {
      
        const vinylPlayer = VinylPlayer();

        if (vinylRef.current) {
            for (let i = 1; i <= 3; i++) {
                const vinylElement = document.querySelector(`.vinyl-${i}`);
                vinylElement.addEventListener('click', () => vinylPlayer.handleVinylClick(i));
            }
            // Cleanup function to remove event listeners
            return () => {
                for (let i = 1; i <= 3; i++) {
                    const vinylElement = document.querySelector(`.vinyl-${i}`);
                    vinylElement.removeEventListener('click', () => vinylPlayer.handleVinylClick(i));
                }
            };
        }
    }, []);


    return (
        <div ref={vinylRef} className='pol-room-div'>
            <img src={logo1} alt='firstVinyl' id="laylow" className='vinyl vinyl-1' />
            <img src={logo2} alt='secondVinyl' id="lomepal" className='vinyl vinyl-2' />
            <img src={logo3} alt='thirdVinyl' id="oboy" className='vinyl vinyl-3' />

        </div>
    );
}

export default VinylVase;