const armsPositions = {                 // List of positions for cds
    1: { horizontal: { value: 17 }, vertical: { value: 17 } },
    2: { horizontal: { value: 17 }, vertical: { value: 60 } },
    3: { horizontal: { value: 17 }, vertical: { value: 103 } },
    4: { horizontal: { value: 60 }, vertical: { value: 17 } },
    5: { horizontal: { value: 60 }, vertical: { value: 60 } },
    6: { horizontal: { value: 60 }, vertical: { value: 103 } },
    7: { horizontal: { value: 103 }, vertical: { value: 17 } },
    8: { horizontal: { value: 103 }, vertical: { value: 60 } },
    9: { horizontal: { value: 103 }, vertical: { value: 103 } },
};



// Fonction pour ajouter les écouteurs d'événements
export function addEventListener() {
    for (let i = 1; i <= 9; i++) {
        const cdElement = document.querySelector(`.disc-${i}`);
        cdElement.addEventListener('click', () => handleCdClick(i));
    }
}

// Fonction pour supprimer les écouteurs d'événements
export function removeEventListener() {
    for (let i = 1; i <= 9; i++) {
        const cdElement = document.querySelector(`.disc-${i}`);
        cdElement.removeEventListener('click', () => handleCdClick(i));
    }
}


// Variables d'état
let currentCd = null;
let isCdOnPlayer = false;


// Fonction pour déplacer un CD vers le lecteur
function moveCdToPlayer(cdElement, pos) {
    let translateY = armsPositions[pos].horizontal.value > armsPositions[5].horizontal.value ? -43 : armsPositions[pos].horizontal.value < armsPositions[5].horizontal.value ? 43 : 0;
    let translateX = armsPositions[pos].vertical.value > armsPositions[5].vertical.value ? -43 : armsPositions[pos].vertical.value < armsPositions[5].vertical.value ? 43 : 0;

    cdElement.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
}

// Fonction pour ramener un CD à sa place d'origine
function moveCdToOriginalPosition(cdElement) {
    cdElement.style.transform = 'translate(0, 0)';
}

// Fonction pour gérer le clic sur un CD
function handleCdClick(pos) {
    const cdElement = document.querySelector(`.disc-${pos}`).children[0];

    if (pos !== 5 && !isCdOnPlayer) {                                   // Move cd from position to player
        moveArms(pos);
        setTimeout(() => {
            currentCd = pos;
            moveCdToPlayer(cdElement, pos);
            moveArms(5);
            cdElement.classList.add('arm-transition');
            setTimeout(() => {
                isCdOnPlayer = true;
                cdElement.classList.remove('arm-transition');
            }, 1000);
        }, 1000);
    } else if (pos == currentCd && pos !== 5 && isCdOnPlayer) {       // Move cd from player to position
            moveCdToOriginalPosition(cdElement);
            moveArms(currentCd);
            cdElement.classList.add('arm-transition');
            setTimeout(() => {
                currentCd = pos;
                isCdOnPlayer = false;
                moveArms(5);
                cdElement.classList.remove('arm-transition');
            }, 1000);
    }
}



export function moveArms(pos) {
    const armHorizontal = document.getElementById('arm-horizontal');
    const armVertical = document.getElementById('arm-vertical');

    // Add the transition class to apply the transition effect
    armHorizontal.classList.add('arm-transition');
    armVertical.classList.add('arm-transition');

    armHorizontal.style.top = armsPositions[pos].horizontal.value + 'px';
    armVertical.style.left = armsPositions[pos].vertical.value + 'px';

    // Optionally, remove the class after the transition has completed
    setTimeout(() => {
        armHorizontal.classList.remove('arm-transition');
        armVertical.classList.remove('arm-transition');
    }, 1000); // Remove the class after 1 second
}

















// export function addEventListener() {
//     document.getElementsByClassName('disc-1')[0].addEventListener('click', () => handleCdClick('1'));
//     document.getElementsByClassName('disc-2')[0].addEventListener('click', () => handleCdClick('2'));
//     document.getElementsByClassName('disc-3')[0].addEventListener('click', () => handleCdClick('3'));
//     document.getElementsByClassName('disc-4')[0].addEventListener('click', () => handleCdClick('4'));
//     document.getElementsByClassName('disc-5')[0].addEventListener('click', () => handleCdClick('5'));
//     document.getElementsByClassName('disc-6')[0].addEventListener('click', () => handleCdClick('6'));
//     document.getElementsByClassName('disc-7')[0].addEventListener('click', () => handleCdClick('7'));
//     document.getElementsByClassName('disc-8')[0].addEventListener('click', () => handleCdClick('8'));
//     document.getElementsByClassName('disc-9')[0].addEventListener('click', () => handleCdClick('9'));

// }

// export function removeEventListener() {
//     document.getElementsByClassName('disc-1')[0].removeEventListener('click', () => handleCdClick('1'));
//     document.getElementsByClassName('disc-2')[0].removeEventListener('click', () => handleCdClick('2'));
//     document.getElementsByClassName('disc-3')[0].removeEventListener('click', () => handleCdClick('3'));
//     document.getElementsByClassName('disc-4')[0].removeEventListener('click', () => handleCdClick('4'));
//     document.getElementsByClassName('disc-5')[0].removeEventListener('click', () => handleCdClick('5'));
//     document.getElementsByClassName('disc-6')[0].removeEventListener('click', () => handleCdClick('6'));
//     document.getElementsByClassName('disc-7')[0].removeEventListener('click', () => handleCdClick('7'));
//     document.getElementsByClassName('disc-8')[0].removeEventListener('click', () => handleCdClick('8'));
//     document.getElementsByClassName('disc-9')[0].removeEventListener('click', () => handleCdClick('9'));
// }