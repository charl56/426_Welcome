// import { emit } from '../../../libs/eventBus';

// const vinyls = {                 // Links of vinyls
//     laylow: "https://www.youtube.com/embed/tYgZtKuuzOE",
//     lomepal: "https://www.youtube.com/embed/okbyUVi_Of0",
//     oboy: "https://www.youtube.com/embed/1VLSjLJWPRE"
// };



// export function VinylPlayer() {
    
//     function handleVinylClick(pos) {
//         const artist = document.querySelector(`.vinyl-${pos}`).getAttribute('id');
//         // Envoie de données au lecteur
//         emit('player.link', { link: vinyls[artist], from: "vinyl" });
//     }

//     return {
//         handleVinylClick // Exportez la fonction handleVinylClick pour y accéder depuis d'autres fichiers
//     };
// }




// // Fonction pour ajouter les écouteurs d'événements
// // export function addEventListener() {
// //     for (let i = 1; i <= 3; i++) {
// //         const vinylElement = document.querySelector(`.vinyl-${i}`);
// //         vinylElement.addEventListener('click', () => handleVinylClick(i));
// //     }
// // }

// // // Fonction pour supprimer les écouteurs d'événements
// // export function removeEventListener() {
// //     for (let i = 1; i <= 3; i++) {
// //         const vinylElement = document.querySelector(`.vinyl-${i}`);
// //         vinylElement.removeEventListener('click', () => handleVinylClick(i));
// //     }
// // }

// /* <iframe width="1519" height="526" src="" title="OBOY - SLS (Clip Officiel)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ 
// /* <iframe width="1519" height="526" src="https://www.youtube.com/embed/abrmqTNHUa0" title="Trajectoire" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ 
// /* <iframe width="1519" height="526" src="" title="UNE HISTOIRE ÉTRANGE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ 
// /* <iframe width="1519" height="526" src="https://www.youtube.com/embed/FEXA3VQAQEs" title="Marathon" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ 
// /* <iframe width="1519" height="526" src="https://www.youtube.com/embed/okbyUVi_Of0" title="Humains (Bonus Track)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ 
// /* <iframe width="1519" height="526" src="https://www.youtube.com/embed/Y4bSBkHTWNg" title="Gusted - Jet Plane" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ 
