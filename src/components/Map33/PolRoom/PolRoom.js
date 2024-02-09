// React
import React, { useRef, useEffect, useState } from 'react';
import './PolRoom.css'

import logo1 from './laylow.jpg'
import logo2 from './lomepal.jpg'
import logo3 from './oboy.jpg'

export default function PolRoom() {


    return (
        <div>
            <div className='pol-room-div'>
                <img src={logo1} className='vinyl'/>
                <img src={logo2} className='vinyl'/>
                <img src={logo3} className='vinyl'/>
            </div>
        </div>
    );
}
