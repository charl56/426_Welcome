// React
import React, { useEffect, useRef } from "react";
import './Jukebox.css'
import jbFront from './images/zamdane.jpg'
import jbBack from './images/youdee.jpg'
import jbRight from './images/luvresval.jpg'
import jbLeft from './images/saturncitizen.jpg'
import jbTop from './images/azur.jpg'
import jbBottom from './images/bobmarley.jpg'

export default function Jukebox() {

    window.onload = () => {

        var cube = document.querySelector('.cube');
        var radioGroup = document.querySelector('.radio__group');
        var currentClass = '';

        function changeSide() {
            console.log("change side")
            var checkedRadio = radioGroup.querySelector(':checked');
            var showClass = 'show-' + checkedRadio.value;
            if (currentClass) {
                cube.classList.remove(currentClass);
            }
            cube.classList.add(showClass);
            currentClass = showClass;
        }
        // set initial side
        changeSide();

        radioGroup.addEventListener('change', changeSide);


    }


    return (
        <div className='charles-room-div'>
            <div className="scene">
                <div className="cube">
                    <div className="cube__face cube__face--front">
                        <img src={jbFront} alt='jukebox_front' className='jukebox_img jukebox--front' />
                        <iframe className="music__player music__player--front" src="https://www.youtube.com/embed/sIkP1X-6enY" title="Zamdane - Affamé #13 : Marseille" allowFullScreen></iframe>
                        {/* <iframe className="music__player music__player--front" src="https://www.youtube.com/embed/VYSMO2siCI8" title="Zamdane - Triste mais elle aime ça (Affamé #16)" allowFullScreen></iframe> */}
                        {/* <iframe className="music__player music__player--front" src="https://www.youtube.com/embed/LqXKTCecmp8?list=PL5loEOVmg__67l09cy7TmJDTIjyLEM8LB" title="Zamdane - Zéro [Audio Officiel]" allowFullScreen></iframe> */}
                        {/* <iframe className="music__player music__player--front" src="https://www.youtube.com/embed/XlfTGVrKOyY" title="Zamdane - Affamé #8 : Hayati" allowFullScreen></iframe> */}
                    </div>
                    <div className="cube__face cube__face--back">
                        <img src={jbBack} alt='jukebox_back' className='jukebox_img jukebox--back' />
                        <iframe className="music__player music__player--back" src="https://www.youtube.com/embed/cE6fmE_-IkA" title="Youv Dee - J&#39;Rêve (Clip officiel)" allowFullScreen></iframe>
                    </div>
                    <div className="cube__face cube__face--right">
                        <img src={jbRight} alt='jukebox_right' className='jukebox_img jukebox--right' />
                        <iframe className="music__player music__player--right" src="https://www.youtube.com/embed/RI4xBNugTp4" title="J&#39;ai fait un rêve" allowFullScreen></iframe>
                    </div>
                    <div className="cube__face cube__face--left">
                        <img src={jbLeft} alt='jukebox_left' className='jukebox_img jukebox--left' />
                        <iframe className="music__player music__player--left" src="https://www.youtube.com/embed/uxaA9N0ZvBs" title="Billets Verts" allowFullScreen></iframe>
                    </div>
                    <div className="cube__face cube__face--top">
                        <img src={jbTop} alt='jukebox_top' className='jukebox_img jukebox--top' />
                        <iframe className="music__player music__player--top" src="https://www.youtube.com/embed/ATxu5K9Ye-M" title="Azur - Période" allowFullScreen></iframe>
                        {/* <iframe className="music__player music__player--top" src="https://www.youtube.com/embed/migbBid5gmI" title="Bushi - Mistral" allowFullScreen></iframe> */}
                        {/* <iframe className="music__player music__player--top" src="https://www.youtube.com/embed/Vv103_q3ECg" title="Luv Resval - Crystal Lake (Clip officiel) ft. Freeze Corleone" allowFullScreen></iframe> */}
                    </div>
                    <div className="cube__face cube__face--bottom">
                        <img src={jbBottom} alt='jukebox_bottom' className='jukebox_img jukebox--bottom' />
                        <iframe className="music__player music__player--bottom" src="https://www.youtube.com/embed/69RdQFDuYPI" title="Bob Marley - Is This Love (Official Music Video)" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
            <div className="radio__group">
                <div>
                    <input type="radio" className="radio__group--btn" name="rotate-cube-side" title="Dessus" value="top" />
                </div>
                <div>
                    <input type="radio" className="radio__group--btn" name="rotate-cube-side" title="Gauche" value="left" />
                    <input type="radio" className="radio__group--btn" name="rotate-cube-side" title="Face" value="front" defaultChecked />
                    <input type="radio" className="radio__group--btn" name="rotate-cube-side" title="Droite" value="right" />
                    <input type="radio" className="radio__group--btn" name="rotate-cube-side" title="Derrière" value="back" />
                </div>
                <div>
                    <input type="radio" className="radio__group--btn" name="rotate-cube-side" title="Dessous" value="bottom" />
                </div>
            </div>

        </div>
    );
}
