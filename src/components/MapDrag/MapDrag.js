// React
import React from 'react';
// DragNDrop
import Draggable from 'react-draggable';
// CSS
import './MapDrag.css';
// Components
import PolRoom from './PolRoom/PolRoom';




export default function MapCard() {

    return (
        <Draggable>
            <div id="container">
                <div className="box"></div>
                <PolRoom />
            </div>
        </Draggable>
    );
}
