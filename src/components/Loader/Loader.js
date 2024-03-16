import React from "react";
import './Loader.css';
import cr7 from '../../assets/gif/ronaldo-siuuu.gif'

const Loader = () => {
    return (
        <div className="loader--div">
            <img src={cr7} alt="loading--img" />
        </div>
    );
};

export default Loader;