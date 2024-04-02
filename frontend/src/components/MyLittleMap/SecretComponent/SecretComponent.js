import React, { useEffect, useState } from 'react';
import './SecretComponent.css';
import background from './images/background.jpg';
import { useAuth } from '../../../service/AuthContext';
import axios from 'axios';

const SecretComponent = () => {
    const { token, setToken } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        console.log("logout")
        setToken(null);
    };

    useEffect(() => {
        if (token) {
            console.log("usseffect")
            checkToken();
        }
    }, [token]); // Appeler checkToken lorsque le token change

    // Fonction pour vérifier le token
    async function checkToken() {
        try {
            const url = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
            const response = await axios.get(url + 'check', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return isAuthenticated ? (
        <div className='secret-component-div'>
            <button className='secret-component-logout' onClick={handleLogout}>Logout</button>
            <h2 className='secret-component-title'>Bienvenue</h2>
            <img src={background} alt='img' className='back__img' />
        </div>
    ) : null;
};

export default SecretComponent;
