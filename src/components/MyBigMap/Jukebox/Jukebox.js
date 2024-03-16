// React
import React, { useEffect, useRef, useState } from "react";
import './Jukebox.css'
import { addEventListener, removeEventListener ,moveArms} from './initEventListener'
// Img
import zamdane from './images/zamdane.jpg'
import youvdee from './images/youdee.jpg'
import luvresval from './images/luvresval.jpg'
import saturncitizen from './images/saturncitizen.jpg'
import azur from './images/azur.jpg'
import bobmarley from './images/bobmarley.jpg'
import pac from './images/2pac.jpg'
import drdre from './images/drdre.jpg'

function Jukebox() {

    const jukeboxRef = useRef(null);        // Init placement of arms
    useEffect(() => {
        if (jukeboxRef.current) {
            addEventListener();             // Add events for cds
            moveArms(5);                    // Move to position 1

            // Cleanup function to remove event listeners
            return () => {
                removeEventListener();      // RemoveEvent for cds
            };
        }
    }, []);


    return (
        <div ref={jukeboxRef} className='charles-room-div'>
            <div className="jb__box">
                <div className="jb__disc disc-1">
                    <img src={zamdane} alt='jukebox_front' className='disc__img' />
                </div>
                <div className="jb__disc disc-2">
                    <img src={azur} alt='jukebox_back' className='disc__img' />
                </div>
                <div className="jb__disc disc-3">
                    <img src={youvdee} alt='jukebox_back' className='disc__img' />

                </div>
                <div className="jb__disc disc-4">
                    <img src={pac} alt='jukebox_back' className='disc__img' />

                </div>
                <div className="jb__player disc-5"></div>
                <div className="jb__disc disc-6">
                    <img src={bobmarley} alt='jukebox_back' className='disc__img' />

                </div>
                <div className="jb__disc disc-7">
                    <img src={saturncitizen} alt='jukebox_back' className='disc__img' />

                </div>
                <div className="jb__disc disc-8">
                    <img src={drdre} alt='jukebox_back' className='disc__img' />
                </div>
                <div className="jb__disc disc-9">
                    <img src={luvresval} alt='jukebox_back' className='disc__img' />
                </div>
            </div>
            <div className="arm arm__horizontal" id="arm-horizontal"></div>
            <div className="arm arm__vertical" id="arm-vertical"></div>
        </div>
    );
}


export default Jukebox;