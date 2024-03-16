import React, { useState } from "react";
import MyBigMap from './MyBigMap/MyBigMap';
import MyLittleMap from "./MyLittleMap/MyLittleMap";
import Loader from './Loader/Loader'

function App() {
    console.log("app")
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 10);
    };

    return (
        <div className="App">
            {isLoading && <Loader />}
            <MyBigMap onLoadingComplete={handleLoadingComplete} />
            <MyLittleMap />
        </div>
    );
}

export default App;