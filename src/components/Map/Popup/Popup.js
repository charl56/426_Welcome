import React, { useRef, useEffect } from 'react';
import './Popup.css'

function Popup({ isOpen, onClose, title }) {

    console.log("props : ", title)

    return (
        <div className={`popup ${isOpen ? 'open' : 'closed'}`}>
          <div className="popup-content">
            <span className="close" onClick={onClose}>FERMER</span>
            <p>{title}</p>
          </div>
        </div>
      );
};


export default Popup;
