// React
import React from 'react';
import './VinylVase.css'

import logo1 from './images/laylow.jpg'
import logo2 from './images/lomepal.jpg'
import logo3 from './images/oboy.jpg'

export default function VinylVase() {


    return (
        <div className='pol-room-div'>
            <img src={logo1} alt='firstVinyl' className='vinyl vinyl1'/>
            <img src={logo2} alt='secondVinyl' className='vinyl vinyl2'/>
            <img src={logo3} alt='thirdVinyl' className='vinyl vinyl3'/>

            {/* <iframe width="1519" height="526" src="https://www.youtube.com/embed/1VLSjLJWPRE" title="OBOY - SLS (Clip Officiel)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* <iframe width="1519" height="526" src="https://www.youtube.com/embed/abrmqTNHUa0" title="Trajectoire" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* <iframe width="1519" height="526" src="https://www.youtube.com/embed/tYgZtKuuzOE" title="UNE HISTOIRE ÉTRANGE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* <iframe width="1519" height="526" src="https://www.youtube.com/embed/FEXA3VQAQEs" title="Marathon" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* <iframe width="1519" height="526" src="https://www.youtube.com/embed/okbyUVi_Of0" title="Humains (Bonus Track)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            {/* <iframe width="1519" height="526" src="https://www.youtube.com/embed/Y4bSBkHTWNg" title="Gusted - Jet Plane" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        </div>
    );
}
