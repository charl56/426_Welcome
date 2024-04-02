import React from 'react';
import './SecretComponent.css';
import background from './images/background.jpg'
import { useAuth } from '../../../service/AuthContext';

const SecretComponent = () => {
    const { token, setToken } = useAuth();

    const handleLogout = () => {
        setToken(null); 
    };

    if (!token) {
        return
    }

    return (
        <div className='secret-component-div'>
            <button className='secret-component-logout' onClick={handleLogout}>Logout</button>
            <h2 className='secret-component-title'>Bienvenue</h2>
            <img src={background} alt='img' className='back__img'/>

        </div>
    );
};

export default SecretComponent;
