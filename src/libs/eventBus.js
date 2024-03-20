// eventBus.js
import React from 'react';
import mitt from 'mitt';

const eventBus = mitt();

export function emit(event, payload) {
 eventBus.emit(event, payload);
}

export function useEventBus(eventName, handler) {
 React.useEffect(() => {
    eventBus.on(eventName, handler);
    return () => eventBus.off(eventName, handler);
 }, [eventName, handler]);
}
