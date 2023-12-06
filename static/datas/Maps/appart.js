let appartParts = {
    //////////
    // Walls
    //////////
    wall1: {
        mesh: null,                                         // Données de l'affichage de l'item
        box: {
            x: 10, 
            y: 6,
            z: 0.2
        },
        color: 0xbbbbbb,
        position: {                 // Position de l'item
            x: -10,
            y: 0,
            z: 0,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: 0,
            z: 0,
        },
    },
    wall2: {
        mesh: null,                                         // Données de l'affichage de l'item
        box: {
            x: 0.2, 
            y: 6,
            z: 10
        },
        color: 0xbbbbbb,
        position: {                 // Position de l'item
            x: -5,
            y: 0,
            z: -5,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: 0,
            z: 0,
        },
    },
}


export {appartParts}             // Elements du décors, avec leur position