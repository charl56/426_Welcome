// React
import React, { useEffect, useRef, useState } from "react";
import './Jukebox.css'
import jbFront from './images/zamdane.jpg'
import jbBack from './images/youdee.jpg'
import jbRight from './images/luvresval.jpg'
import jbLeft from './images/saturncitizen.jpg'
import jbTop from './images/azur.jpg'
import jbBottom from './images/bobmarley.jpg'

function Jukebox() {

    const [selectedCd, setSelectedCd] = useState(null);

    useEffect(() => {
        console.log("selectedCd : ", selectedCd)
        if (selectedCd !== null) {
            // Move the horizontal arm to cross over the selected CD
            const horizontalArm = document.getElementById('arm-horizontal');
            horizontalArm.style.top = `${selectedCd.offsetTop + selectedCd.offsetHeight / 2}px`;

            // Move the vertical arm to cross over the selected CD
            const verticalArm = document.getElementById('arm-vertical');
            verticalArm.style.left = `${selectedCd.offsetLeft + selectedCd.offsetWidth / 2}px`;
        }
    


    }, [selectedCd]);

    const handleCdClick = (cd) => {
        console.log("handleCdClick : ", cd)
        setSelectedCd(cd);
    };



    return (
        <div className='charles-room-div'>
            <div className="jb__box">
                <div className="jb__disc disc-1" onClick={() => handleCdClick(document.querySelector('.disc-1'))}>
                    <img src={jbFront} alt='jukebox_front' className='disc__img' />
                </div>
                <div className="jb__disc disc-2" onClick={() => handleCdClick(document.querySelector('.disc-2'))}>
                    <img src={jbBack} alt='jukebox_back' className='disc__img' />
                </div>
                <div className="jb__disc disc-3" onClick={() => handleCdClick(document.querySelector('.disc-3'))}></div>
                <div className="jb__disc disc-4" onClick={() => handleCdClick(document.querySelector('.disc-4'))}></div>
                <div className="jb__player disc-5"></div>
                <div className="jb__disc disc-6" onClick={() => handleCdClick(document.querySelector('.disc-6'))}></div>
                <div className="jb__disc disc-7" onClick={() => handleCdClick(document.querySelector('.disc-7'))}></div>
                <div className="jb__disc disc-8" onClick={() => handleCdClick(document.querySelector('.disc-8'))}></div>
                <div className="jb__disc disc-9" onClick={() => handleCdClick(document.querySelector('.disc-9'))}></div>
            </div>
            <div className="arm__horizontal" id="arm-horizontal"></div>
            <div className="arm__vertical" id="arm-vertical"></div>
        </div>
    );
}


export default Jukebox;


// window.onload = () => {

//     var cube = document.querySelector('.cube');
//     var radioGroup = document.querySelector('.radio__group');
//     var currentClass = '';

//     function changeSide() {
//         var checkedRadio = radioGroup.querySelector(':checked');
//         var showClass = 'show-' + checkedRadio.value;
//         if (currentClass) {
//             cube.classList.remove(currentClass);
//         }
//         cube.classList.add(showClass);
//         currentClass = showClass;
//     }
//     // set initial side
//     changeSide();

//     radioGroup.addEventListener('change', changeSide);


// }


/*
<div className="scene">
    <div className="cube">
        <div className="cube__face cube__face--front">
            <iframe className="music__player music__player--front" src="https://www.youtube.com/embed/sIkP1X-6enY" title="Zamdane - Affamé #13 : Marseille" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="cube__face cube__face--back">
                <iframe className="music__player music__player--back" src="https://www.youtube.com/embed/cE6fmE_-IkA" title="Youv Dee - J&#39;Rêve (Clip officiel)" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="cube__face cube__face--right">
                <img src={jbRight} alt='jukebox_right' className='jukebox_img jukebox--right' />
                <iframe className="music__player music__player--right" src="https://www.youtube.com/embed/RI4xBNugTp4" title="J&#39;ai fait un rêve" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="cube__face cube__face--left">
                <img src={jbLeft} alt='jukebox_left' className='jukebox_img jukebox--left' />
                <iframe className="music__player music__player--left" src="https://www.youtube.com/embed/uxaA9N0ZvBs" title="Billets Verts" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="cube__face cube__face--top">
                <img src={jbTop} alt='jukebox_top' className='jukebox_img jukebox--top' />
                <iframe className="music__player music__player--top" src="https://www.youtube.com/embed/ATxu5K9Ye-M" title="Azur - Période" allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="cube__face cube__face--bottom">
                <img src={jbBottom} alt='jukebox_bottom' className='jukebox_img jukebox--bottom' />
                <iframe className="music__player music__player--bottom" src="https://www.youtube.com/embed/69RdQFDuYPI" title="Bob Marley - Is This Love (Official Music Video)" allowFullScreen loading="lazy"></iframe>
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
</div> */