import React, { useEffect, useState } from "react";
import './YoutubePlayer.css';
import { useEventBus } from "../../../../libs/eventBus";

function YoutubePlayer() {

    /***** Datas for YtbPlayer component *****/
    const [link, setLink] = useState(null);
    const [isCdOnPlayer, setIsCdOnPlayer] = useState(false);
    const [cdPos, setCdPos] = useState(0);

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            console.log(isCdOnPlayer)
            setLink(null);
            if (isCdOnPlayer) {
                const cdElement = document.querySelector(`.disc-${cdPos}`).children[0];
                cdElement.style.transform = 'translate(0, 0)';
                cdElement.classList.remove('disc__rotate');
                setIsCdOnPlayer(false);     // Remove cd so update value
                console.log(isCdOnPlayer)
            } else {
                console.log("rien")
            }
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
        setLink(data.link);                                                             // Set new link on player
        console.log(data.pos !== null)
        if (data.pos !== null) {
            setIsCdOnPlayer(true);
            setCdPos(data.pos);
            console.log(isCdOnPlayer)
        } else {
            console.log("fals ele ")
            setIsCdOnPlayer(false);
        }
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
