import React, { useEffect, useState } from "react";
import './YoutubePlayer.css';
import { useEventBus } from "../../../../libs/eventBus";

function YoutubePlayer() {

    /***** Datas for YtbPlayer component *****/
    const [link, setLink] = useState(null);
    const [isCdOnPlayer, setIsCdOnPlayer] = useState(null);

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            setLink(null);
            if(isCdOnPlayer){
                console.log("remove le ouai")
            } else {
                console.log("rien")
            }
            // Here i would like to get the value of currentCd and isCdOnPlayer, from Jukebox component
            // If isCdOnPlayer is true, i want to execut the function moveCdToOriginalPosition(currentCd) in the component Jukebox
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
        console.log(data.from)
        setLink(data.link);                                                             // Set new link on player
        data.from === "jukebox" ? setIsCdOnPlayer(true) : setIsCdOnPlayer(false);       // Know if cd on player, to auto remove cd
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
