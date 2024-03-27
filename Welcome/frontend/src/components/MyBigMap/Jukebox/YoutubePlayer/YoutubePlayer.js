import React, { useEffect, useState } from "react";
import './YoutubePlayer.css';
import { useEventBus } from "../../../../libs/eventBus";

function YoutubePlayer() {

    /***** Datas for YtbPlayer component *****/
    const [link, setLink] = useState(null);

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            setLink(null);
        }
    }
    function setLinkNull() {
        setLink(null);
    }
    function addEventListener() {
        document.addEventListener("keydown", handleKeyPress);                                       // Create eventListener for "echap" touch
        document.querySelector(".text-ytb-player").addEventListener('click', setLinkNull);  // Create eventListener onClick
    }
    function removeEventListener() {
        document.removeEventListener("keydown", handleKeyPress);
        document.querySelector(".text-ytb-player").removeEventListener('click', setLinkNull);
    }
    useEventBus('player.link', (data) => {
        setLink(data.link);
    });

    /***** Functions for YtbPlayer component *****/
    useEffect(() => {
        addEventListener();
        let iframe = document.getElementsByClassName('youtube-player-div')[0];
        if (link === null) {
            iframe.classList.remove('show-ytb-player')
            document.getElementById('iframe-ytb-player').setAttribute('src', null);
            return;
        } else {
            document.getElementById('iframe-ytb-player').setAttribute('src', link);
            iframe.classList.add('show-ytb-player')
        }

        return () => {
            removeEventListener();
        };
    }, [link]);

    return (
        <div className='youtube-player-div'>
            <iframe className="music__player hide-ytb-player" id="iframe-ytb-player" src="https://www.youtube.com/embed/tYgZtKuuzOE" title="" allowFullScreen>
            </iframe>
            <p className="text-ytb-player">"Echap" pour fermer le lecteur</p>
        </div>
    );
}

export default YoutubePlayer;
