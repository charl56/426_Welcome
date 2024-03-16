// React
import React, { useEffect, useRef, useState } from "react";
import './YoutubePlayer.css'


function YoutubePlayer() {

    // const jukeboxRef = useRef(null);        // Init placement of arms
    // useEffect(() => {
    //     if (jukeboxRef.current) {
    //         addEventListener();             // Add events for cds
    //         moveArms(5);                    // Move to position 1

    //         // Cleanup function to remove event listeners
    //         return () => {
    //             removeEventListener();      // RemoveEvent for cds
    //         };
    //     }
    // }, []);


    return (
        // <div ref={jukeboxRef} className='charles-room-div'>
        <div className='youtube-player-div'>
            <iframe className="music__player music__player--front" src="https://www.youtube.com/embed/sIkP1X-6enY" title="Zamdane - Affamé #13 : Marseille" allowFullScreen></iframe>
        </div>
    );
}


export default YoutubePlayer;