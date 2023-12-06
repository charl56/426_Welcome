let sceneItems = {
    //////////
    // Chaises
    //////////
    chaise1: {
        obj: './static/Models/Pol/Relec.obj',      // Item
        mtl: './static/Models/Pol/Relec.mtl',      // Item
        mesh: null,                                         // Données de l'affichage de l'item
        position: {                 // Position de l'item
            x: 0,
            y: 0,
            z: 0,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: 0,
            z: 0,
        },
        scale: 0.025,                    // Echelle de l'item 
        hitBoxPosition: {
            x: 0,
            y: 0,
            z: 0,
        },
        hitBox: {
            x: 1.3,
            y: 1.1,
            z: 2.7,
        }
    },
    //////////
    // Appart
    //////////
    appart: {
        obj: './static/Models/Appart/426TS.obj',      // Item
        mtl: './static/Models/Appart/426TS.mtl',      // Item
        mesh: null,                                         // Données de l'affichage de l'item
        position: {                 // Position de l'item
            x: 5,
            y: 0,
            z: 5,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: 0,
            z: 0,
        },
        scale: 0.01,                    // Echelle de l'item 
        hitBoxPosition: {
            x: 0,
            y: 0,
            z: 0,
        },
        hitBox: {
            x: 1.3,
            y: 1.1,
            z: 2.7,
        }
    },
}


export {sceneItems}             // Elements du décors, avec leur position