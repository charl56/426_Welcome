let sceneItems = {
    //////////
    // Chaises
    //////////
    // chaise1: {
    //     obj: './static/Models/Pol/Relec.obj',      // Item
    //     mtl: './static/Models/Pol/Relec.mtl',      // Item
    //     mesh: null,                                         // Données de l'affichage de l'item
    //     position: {                 // Position de l'item
    //         x: 10,
    //         y: 0,
    //         z: 0,
    //     },
    //     rotation: {                 // Rotation de l'item
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //     },
    //     scale: 0.025,                    // Echelle de l'item 
    //     hitBoxPosition: {
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //     },
    //     hitBox: {
    //         x: 1.3,
    //         y: 1.1,
    //         z: 2.7,
    //     }
    // },
    //////////
    // Kitchen
    //////////
    fridge: {
        obj: './static/Models/Assets_obj/fridge_001.obj',      // Item
        mtl: './static/Models/Assets_obj/fridge_001.mtl',      // Item
        mesh: null,                                         // Données de l'affichage de l'item
        position: {                 // Position de l'item
            x: 14.5,
            y: 0.01,
            z: 0.05,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: -Math.PI/2,
            z: 0,
        },
        scale: 1.8,                    // Echelle de l'item 
    },
    kitchen_table: {
        obj: './static/Models/Assets_obj/kitchen_table_001.obj',      // Item
        mtl: './static/Models/Assets_obj/kitchen_table_001.mtl',      // Item
        mesh: null,                                         // Données de l'affichage de l'item
        position: {                 // Position de l'item
            x: 9,
            y: 1,
            z: -2,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: 0,
            z: 0,
        },
        scale: 1.2,                    // Echelle de l'item 
    },
    /////////
    // 426A
    /////////
    Ikea_meuble: {
        obj: './static/Models/Appart_obj/Ikea_meuble.obj',      // Item
        mtl: './static/Models/Appart_obj/Ikea_meuble.mtl',      // Item
        mesh: null,                                         // Données de l'affichage de l'item
        position: {                 // Position de l'item
            x: 6.7,
            y: 0.1,
            z: -11,
        },
        rotation: {                 // Rotation de l'item
            x: 0,
            y: Math.PI/2,
            z: 0,
        },
        scale: 1.2,                    // Echelle de l'item 
    },
}


export {sceneItems}             // Elements du décors, avec leur position