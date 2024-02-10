// React
import React from 'react';
import './PolRoom.css'

import logo1 from './laylow.jpg'
import logo2 from './lomepal.jpg'
import logo3 from './oboy.jpg'

export default function PolRoom() {


    return (
        <div className='pol-room-div'>
            <img src={logo1} alt='firstVinyl' className='vinyl vinyl1'/>
            <img src={logo2} alt='secondVinyl' className='vinyl vinyl2'/>
            <img src={logo3} alt='thirdVinyl' className='vinyl vinyl3'/>
        </div>
    );
}
