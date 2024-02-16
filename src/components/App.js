import React, { useEffect, useState } from "react";// Libs for leaflet & Co
// Components
import MyMap from './MyMap/MyMap';
import Loader from './Loader/Loader'

function App() {

    // Disable right click
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    // Loader
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };


    return (
        <div className="App">
            <Loader isLoading={isLoading} />
            <MyMap onLoadingComplete={handleLoadingComplete} />
        </div>
    );
}

export default App;
