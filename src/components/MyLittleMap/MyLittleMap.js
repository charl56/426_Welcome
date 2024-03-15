import React, { useEffect, useRef, useState } from "react";
// CSS
import './MyLittleMap.css';
// Components

const MyLittleMap = React.memo(() => {

    const [selectedCd, setSelectedCd] = useState(null);

    useEffect(() => {
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
        setSelectedCd(cd);
    };


    return (
        <div className="map__little--screen">
            <div className="jb__disc disc-1" onClick={() => handleCdClick(document.querySelector('.disc-1'))}>
                ouai le bouton ici
            </div>
        </div>
    );
})

export default MyLittleMap;