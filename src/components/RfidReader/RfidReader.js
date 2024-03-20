import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RfidReader = () => {

    const [data, setData] = useState(false);


    useEffect(() => {
        const readRFID = async () => {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();

                ndef.addEventListener('reading', async ({ message, serialNumber }) => {
                    const record = message.records[0];
                    const encryptedData = record.data.buffer;
                    setData(encryptedData)
                    const response = await axios.post('/api/authenticate', { encryptedData, serialNumber });
                    if (response.data.authenticated) {
                        console.log('Authentication successful');
                    } else {
                        console.log('Authentication failed');
                    }
                });
            } catch (error) {
                console.error('Error reading RFID:', error);
            }
        };

        readRFID();
    }, []);

    return <div>Reading RFID... {data} </div>;
};

export default RfidReader;