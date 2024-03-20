import React, { useEffect, useState } from "react";
import './YoutubePlayer.css';
import { useEventBus } from "../../../../libs/eventBus";

function YoutubePlayer() {
    const [link, setLink] = useState(null);

    // Hide ytb player when touch "echap" is clicked
    useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === "Escape") {
                setLink(null);
            }
        }

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);



    useEventBus('player.link', (data) => {
        setLink(data.link);
    });


    useEffect(() => {
        console.log("link : ", link);

        let iframe = document.getElementsByClassName('youtube-player-div')[0];
        if (link === null) {
            console.log("cacher")
            iframe.classList.remove('show-ytb-player')
            document.getElementById('iframe-ytb-player').setAttribute('src', null);
            return;
        } else {
            document.getElementById('iframe-ytb-player').setAttribute('src', link);
            iframe.classList.add('show-ytb-player')
        }

    }, [link]);

    return (
        <div className='youtube-player-div'>
            <iframe className="music__player hide-ytb-player" id="iframe-ytb-player" src="https://www.youtube.com/embed/tYgZtKuuzOE" title="Zamdane - Affamé #13 : Marseille" allowFullScreen>
                "echap" pour fermer le lecteur
            </iframe>
        </div>
    );
}

export default YoutubePlayer;





// const playerRef = useRef(null); // Init placement of arms
// useEffect(() => {
//     if (playerRef.current) {
//         // addEventListener();             // Add events for cds

//         // Cleanup function to remove event listeners
//         return () => {
//             // removeEventListener();      // RemoveEvent for cds
//         };
//     }
// }, []);