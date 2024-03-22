import React, { useEffect, useState, useRef } from 'react';
import './RfidReader.css'
import axios from 'axios';

function RfidReader() {

    /***** Datas for RfidRead component *****/
    const [data, setData] = useState(false);
    const [nfcError, setNfcError] = useState(false);
    const [data2, setData2] = useState("message");
    const [data3, setData3] = useState("record");
    const [data4, setData4] = useState("encrypted");
    
    async function startReadRfid() {
        console.log('Start reading')
        try {
            const ndef = new window.NDEFReader();
            await ndef.scan();

            ndef.addEventListener('reading', async ({ message, serialNumber }) => {
                setData2(message)
                const record = message.records[0];
                setData3(record)
                const encryptedData = record.data.buffer;
                setData4(serialNumber)


                setData(encryptedData);
                // const response = await axios.post('/api/authenticate', { encryptedData, serialNumber });
                // if (response.data.authenticated) {
                //     console.log('Authentication successful');
                // } else {
                //     console.log('Authentication failed');
                // }
                setNfcError(false); 
            });
        } catch (error) {
            console.error('Error reading RFID:', error);
            setData2("error reading NFC")
            setNfcError(true); 
        }
    };
    function addEventListener() {
        const btnElement = document.querySelector('.read-rfid-btn');
        btnElement.addEventListener('click', () => startReadRfid());
    }
    function removeEventListener() {
        const btnElement = document.querySelector('.read-rfid-btn');
        btnElement.removeEventListener('click', () => startReadRfid());

    }



    /***** Functions for RfidRead component *****/
    const reafReadRef = useRef(null);
    useEffect(() => {
        if (reafReadRef.current) {
            addEventListener();
            return () => {
                removeEventListener();
            };
        }
    })


    return (
        <div ref={reafReadRef} className='read-read-div'>
            <p className='read-rfid-text-test'>En cours de test</p>
            <div className='read-rfid-btn'>Read RFID</div>
            <p className='read-rfid-text-warning'>Uniquement sur smartphone</p>
            {data && <div>Reading RFID... {data}</div>}
            <div>{data2}</div>
            <div>{data3}</div>
            <div>{data4}</div>
            {nfcError && <p className='read-rfid-text-error-nfc'>Impossible d'utiliser le scan NFC</p>}
        </div>
    );

}

export default RfidReader;