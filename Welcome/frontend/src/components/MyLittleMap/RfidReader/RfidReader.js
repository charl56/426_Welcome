import React, { useEffect, useState, useRef } from 'react';
import './RfidReader.css'
import axios from 'axios';

function RfidReader() {

    const [data, setData] = useState("");
    const [scanning, setScanning] = useState(false);

    async function startScan() {
        if ("NDEFReader" in window) {
            const ndef = new window.NDEFReader();
            console.log("cloicik ouai")
            if (scanning) {
                setScanning(false);
                ndef.clear();
            } else {
                try {
                    await ndef.scan();
                    console.log(ndef)
                    setScanning(true);
                    ndef.onreading = (event) => {
                        const decoder = new TextDecoder("utf-8");
                        const data = decoder.decode(event.message.records[0].data);
                        setData(data);
                        console.log(data)
                    };
                } catch (error) {
                    console.log(error);
                    setData("NFC error during scanning.");
                }
            }
        } else {
            console.log("nfc not available")
            setData("NFC scanning is not supported in your browser.");
        }

    }

    function addEventListener() {
        const btnElement = document.querySelector('#start-stop-btn');
        btnElement.addEventListener('click', () => startScan());
    }
    function removeEventListener() {
        const btnElement = document.querySelector('#start-stop-btn');
        btnElement.removeEventListener('click', () => startScan());

    }

    const reafReadRef = useRef(null);
    useEffect(() => {
        if (reafReadRef.current) {
            addEventListener();
            return () => {
                removeEventListener();
            }
        }
    })


    return (
        <div ref={reafReadRef} className='read-read-div'>
            <p>{data}</p>
            <button id="start-stop-btn">{scanning ? "Stop Scanning" : "Start Scanning"}</button>
        </div>
    );

}

export default RfidReader;