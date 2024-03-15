import React, { useState } from "react";// Libs for leaflet & Co
// Components
import MyBigMap from './MyBigMap/MyBigMap';
import MyLittleMap from "./MyLittleMap/MyLittleMap";
import Loader from './Loader/Loader'

function App() {

    // Disable right click
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    console.log("app")
    // Loader
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className="App">
            {/* <Loader isLoading={isLoading} /> */}
            <MyBigMap onLoadingComplete={handleLoadingComplete} />
            {/* <MyBigMap /> */}
            <MyLittleMap />
        </div>
    );
}

export default App;
