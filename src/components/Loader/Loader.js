import React, { useEffect, useState } from "react"; // Assurez-vous d'importer useState
import './Loader.css';
import cr7 from '../../assets/gif/ronaldo-siuuu.gif'

const Loader = React.memo(({ isLoading }) => {
    // Utilisez useState pour contrôler la visibilité du loader
    const [showLoader, setShowLoader] = useState(isLoading);

    // Utilisez useEffect pour gérer le délai
    useEffect(() => {
        if (!isLoading) {
            // Si isLoading est false, planifiez de cacher le loader après  6 secondes
            const timeoutId = setTimeout(() => {
                setShowLoader(false); // Mettre à jour l'état pour cacher le loader
            },  6000);

            // Nettoyez l'effet pour annuler le setTimeout si le composant est démonté
            return () => clearTimeout(timeoutId);
        } else {
            // Si isLoading est true, affichez le loader
            setShowLoader(true);
        }
    }, [isLoading]); // Dépendance sur isLoading pour s'exécuter à chaque changement

    // Si showLoader est false, ne retournez rien (ou retournez un élément de transition si nécessaire)
    if (!showLoader) return null;

    return (
        <div className="loader--div">
            <img src={cr7} alt="loading--img" />
        </div>
    );
});

export default Loader;
