import React from 'react';
import { useAuth } from '../../../service/AuthContext';
import './SecretComponent.css';

const SecretComponent = () => {
    const { token, setToken } = useAuth();

    const handleLogout = () => {
        setToken(null); 
    };

    if (!token) {
        return <div>You must be logged in to view this content.</div>;
    }

    return (
        <div className='secret-component-div'>
            <h2>Protected Component</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default SecretComponent;
