import React, { useEffect, useRef } from "react";// Libs for leaflet & Co
// CSS
import './Loader.css';
// Components

const Loader = React.memo(({ isLoading }) => {

    if (!isLoading) {
        return null; // Ne rien afficher si le chargement est terminé
    }


    return (
        <div className="loader-div">
            <h1>Chargement</h1>
        </div>
    );
})

export default Loader;