import React, { Component } from "react";
// CSS
import './MyLittleMap.css';
// Components
import RfidReader from "./RfidReader/RfidReader";
import SecretComponent from "./SecretComponent/SecretComponent";
import { AuthProvider } from "../../service/AuthContext";

class MyLittleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Initialisation de l'état local
        };
    }

    componentDidMount() {
        // Logique à exécuter après le rendu initial
    }

    componentDidUpdate(prevProps, prevState) {
        // Logique à exécuter après une mise à jour de props ou d'état
    }

    componentWillUnmount() {
        // Nettoyage des ressources lors de la suppression du composant
    }

    render() {
        return (
            <div className="map__little--screen">
                <div className="map__little__div--title">
                    <p className="map__little__title">Studi0426</p>
                </div>
                <div className="map__little__div--rfid">
                    <AuthProvider>
                        <SecretComponent />
                        <RfidReader />
                    </AuthProvider>
                </div>
            </div >
        );
    }
}

export default MyLittleMap;