// useEventBus.js
import { useContext } from "react";
import { EventBusContext } from "./eventBusContext";

export const useEventBus = () => {
    const context = useContext(EventBusContext);
    return context; // Retourne l'objet de contexte complet ou spécifique
};
