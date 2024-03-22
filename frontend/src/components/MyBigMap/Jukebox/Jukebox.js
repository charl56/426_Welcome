// React
import React, { useEffect, useRef } from "react";
import './Jukebox.css'
import { emit } from "../../../libs/eventBus";
import YoutubePlayer from "./YoutubePlayer/YoutubePlayer";
import { PlayerProvider } from "./YoutubePlayer/PlayerContext";
// Img
import zamdane from './images/zamdane.jpg'
import youvdee from './images/youdee.jpg'
import luvresval from './images/luvresval.jpg'
import disiz from './images/disiz.jpg'
import azur from './images/azur.jpg'
import bobmarley from './images/bobmarley.jpg'
import pac from './images/2pac.jpg'
import drdre from './images/drdre.jpg'

function Jukebox() {
    /***** Datas for Jukebox component *****/
    const armsPositions = {
        1: { horizontal: { value: 17 }, vertical: { value: 17 }, link: "https://www.youtube.com/embed/r4WZcP5p0og" },
        2: { horizontal: { value: 17 }, vertical: { value: 60 }, link: "https://www.youtube.com/embed/ATxu5K9Ye-M" },
        3: { horizontal: { value: 17 }, vertical: { value: 103 }, link: "https://www.youtube.com/embed/u1LpPFSCMHw" },
        4: { horizontal: { value: 60 }, vertical: { value: 17 }, link: "https://www.youtube.com/embed/fDjMSiECbgg" },
        5: { horizontal: { value: 60 }, vertical: { value: 60 }, link: "" },
        6: { horizontal: { value: 60 }, vertical: { value: 103 }, link: "https://www.youtube.com/embed/1ti2YCFgCoI" },
        7: { horizontal: { value: 103 }, vertical: { value: 17 }, link: "https://www.youtube.com/embed/WzLZpZCVohI" },
        8: { horizontal: { value: 103 }, vertical: { value: 60 }, link: "https://www.youtube.com/embed/8GliyDgAGQI" },
        9: { horizontal: { value: 103 }, vertical: { value: 103 }, link: "https://www.youtube.com/embed/RI4xBNugTp4" },
    };
    // Variables d'état
    let currentCd = null;
    let isCdOnPlayer = false;
    // Fonction pour déplacer un CD vers le lecteur
    function moveCdToPlayer(cdElement, pos) {
        let translateY = armsPositions[pos].horizontal.value > armsPositions[5].horizontal.value ? -43 : armsPositions[pos].horizontal.value < armsPositions[5].horizontal.value ? 43 : 0;
        let translateX = armsPositions[pos].vertical.value > armsPositions[5].vertical.value ? -43 : armsPositions[pos].vertical.value < armsPositions[5].vertical.value ? 43 : 0;

        cdElement.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    }
    // Fonction pour ramener un CD à sa place d'origine
    function moveCdToOriginalPosition(cdElement) {
        cdElement.style.transform = 'translate(0, 0)';
    }
    // Add event click
    function addEventListener() {
        for (let i = 1; i <= 9; i++) {
            const cdElement = document.querySelector(`.disc-${i}`);
            cdElement.addEventListener('click', () => handleCdClick(i));
        }
    }
    // Remove event click
    function removeEventListener() {
        for (let i = 1; i <= 9; i++) {
            const cdElement = document.querySelector(`.disc-${i}`);
            cdElement.removeEventListener('click', () => handleCdClick(i));
        }
    }
    // Moves arms
    function moveArms(pos) {
        const armHorizontal = document.getElementById('arm-horizontal');
        const armVertical = document.getElementById('arm-vertical');

        // Add the transition class to apply the transition effect
        armHorizontal.classList.add('arm-transition');
        armVertical.classList.add('arm-transition');

        armHorizontal.style.top = armsPositions[pos].horizontal.value + 'px';
        armVertical.style.left = armsPositions[pos].vertical.value + 'px';

        // Optionally, remove the class after the transition has completed
        setTimeout(() => {
            armHorizontal.classList.remove('arm-transition');
            armVertical.classList.remove('arm-transition');
        }, 1000); // Remove the class after 1 second
    }
    function handleCdClick(pos) {
        const cdElement = document.querySelector(`.disc-${pos}`).children[0];
        if (pos !== 5 && !isCdOnPlayer) {                                   // Move cd from position to player
            moveArms(pos);
            setTimeout(() => {
                currentCd = pos;
                moveCdToPlayer(cdElement, pos);
                moveArms(5);
                cdElement.classList.add('arm-transition');
                // Envoie de données au lecteur
                emit('player.link', { link: armsPositions[pos].link });

                setTimeout(() => {
                    isCdOnPlayer = true;
                    cdElement.classList.remove('arm-transition');
                }, 1000);
            }, 1000);
        } else if (pos == currentCd && pos !== 5 && isCdOnPlayer) {       // Move cd from player to position
            moveCdToOriginalPosition(cdElement);
            moveArms(currentCd);
            cdElement.classList.add('arm-transition');
            // Envoie de données au lecteur
            emit('player.link', { link: null });
            setTimeout(() => {
                currentCd = pos;
                isCdOnPlayer = false;
                moveArms(5);
                cdElement.classList.remove('arm-transition');
            }, 1000);
        }
    }
    
    /***** Functions for Jukebox component *****/
    const jukeboxRef = useRef(null);       
    useEffect(() => {
        if (jukeboxRef.current) {
            addEventListener();     // Events for cd click
            moveArms(5);            // Init placement of arms
            return () => {
                removeEventListener();
            };
        }
    })



    return (
        <div ref={jukeboxRef} className='charles-room-div'>
            {/* Jukebox */}
            <div className='jb__box'>
                <div className='jb__disc disc-1'>
                    <img src={zamdane} alt='img' className='disc__img' />
                </div>
                <div className='jb__disc disc-2'>
                    <img src={azur} alt='img' className='disc__img' />
                </div>
                <div className='jb__disc disc-3'>
                    <img src={youvdee} alt='img' className='disc__img' />

                </div>
                <div className='jb__disc disc-4'>
                    <img src={pac} alt='img' className='disc__img' />

                </div>
                <div className='jb__player disc-5'></div>
                <div className='jb__disc disc-6'>
                    <img src={bobmarley} alt='img' className='disc__img' />

                </div>
                <div className='jb__disc disc-7'>
                    <img src={disiz} alt='img' className='disc__img' />

                </div>
                <div className='jb__disc disc-8'>
                    <img src={drdre} alt='img' className='disc__img' />
                </div>
                <div className='jb__disc disc-9'>
                    <img src={luvresval} alt='img' className='disc__img' />
                </div>
            </div>
            <div className='arm arm__horizontal' id='arm-horizontal'></div>
            <div className='arm arm__vertical' id='arm-vertical'></div>
            {/* Lecteur YTB */}
            <PlayerProvider>
                <YoutubePlayer />
            </PlayerProvider>
        </div>
    );
}


export default Jukebox;