import React, { useState, useEffect } from 'react';
import './RfidReader.css';
import axios from 'axios';
// import { Cookies } from 'react-cookie';
import { useAuth } from '../../../service/AuthContext';

const RfidReader = () => {
    const [data, setData] = useState("");
    const [scanning, setScanning] = useState(false);
    const [username, setUsername] = useState("");
    // const cookies = new Cookies(); // Initialize Cookies instance
    const { setToken } = useAuth();

    const startScan = async () => {
        setToken(null)
        if (!username) {
            setData("Le champ user ne doit pas être vide");
            return;
        }

        if ("NDEFReader" in window) {
            const ndef = new window.NDEFReader();
            if (scanning) {
                setScanning(false);
                ndef.clear();
            } else {
                try {
                    await ndef.scan();
                    setScanning(true);
                    ndef.onreading = async (event) => {
                        const decoder = new TextDecoder("utf-8");
                        const data = decoder.decode(event.message.records[0].data);

                        const url = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
                        const response = await axios.post(url + 'login', {
                            "username": username,
                            "password": data
                        });

                        if (response.status == 200) {
                            // cookies.set('token', response.data.token, { path: '/' }); // Use Cookies instance to set cookie
                            setToken(response.data.token);
                            setData("Welcome !");
                        } else {
                            setData("Error login");
                        }
                    };
                } catch (error) {
                    console.log(error);
                    setData("NFC error during scanning.");
                }
            }
        } else {
            console.log("nfc not available");
            setData("NFC scanning is not supported in your browser.");
        }
    };

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    useEffect(() => {
        const addEventListener = () => {
            document.getElementById('start-stop-btn').addEventListener('click', startScan);
        };

        const removeEventListener = () => {
            document.getElementById('start-stop-btn').removeEventListener('click', startScan);
        };

        addEventListener();
        return () => {
            removeEventListener();
        };
    }, [scanning, username]);

    return (
        <div className='read-read-div'>
            <p>{data}</p>
            <input type="text" value={username} onChange={handleChange} />
            <button id="start-stop-btn">{scanning ? "Stop Scanning" : "Start Scanning"}</button>
        </div>
    );
};

export default RfidReader;
