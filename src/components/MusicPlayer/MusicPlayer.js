import React, { useEffect, useRef } from 'react';
import './MusicPlayer.css'



const MusicPlayer = () => {

    return (
        <div>
            <iframe className="music-player" src="https://www.youtube.com/embed/videoseries?si=X1ngoMHSvQKvA4we&amp;list=PLr_-sENXrDDm-8HGTj4rjsgIbNZGlk7lt" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>        
        </div>
    );
};




export default MusicPlayer;
