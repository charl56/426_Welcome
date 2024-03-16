const armsPositions = {                 // List of positions for cds
    1: { horizontal: { value: '17px' }, vertical: { value: '16px' } },
    2: { horizontal: { value: '17px' }, vertical: { value: '60px' } },
    3: { horizontal: { value: '17px' }, vertical: { value: '102px' } },
    4: { horizontal: { value: '59px' }, vertical: { value: '16px' } },
    5: { horizontal: { value: '59px' }, vertical: { value: '60px' } },
    6: { horizontal: { value: '59px' }, vertical: { value: '102px' } },
    7: { horizontal: { value: '103px' }, vertical: { value: '16px' } },
    8: { horizontal: { value: '103px' }, vertical: { value: '60px' } },
    9: { horizontal: { value: '103px' }, vertical: { value: '102px' } },
};


export function addEventListener(){
    document.getElementsByClassName('disc-1')[0].addEventListener('click', () => handleCdClick('1'));
    document.getElementsByClassName('disc-2')[0].addEventListener('click', () => handleCdClick('2'));
    document.getElementsByClassName('disc-3')[0].addEventListener('click', () => handleCdClick('3'));
    document.getElementsByClassName('disc-4')[0].addEventListener('click', () => handleCdClick('4'));
    document.getElementsByClassName('disc-5')[0].addEventListener('click', () => handleCdClick('5'));
    document.getElementsByClassName('disc-6')[0].addEventListener('click', () => handleCdClick('6'));
    document.getElementsByClassName('disc-7')[0].addEventListener('click', () => handleCdClick('7'));
    document.getElementsByClassName('disc-8')[0].addEventListener('click', () => handleCdClick('8'));
    document.getElementsByClassName('disc-9')[0].addEventListener('click', () => handleCdClick('9'));

}


export function removeEventListener(){
    
}


const handleCdClick = (pos) => {
    moveArms(pos)
};

export function moveArms(pos) {
    const armHorizontal = document.getElementById('arm-horizontal');
    const armVertical = document.getElementById('arm-vertical');

    // Add the transition class to apply the transition effect
    armHorizontal.classList.add('arm-transition-horizontal');
    armVertical.classList.add('arm-transition-vertical');

    armHorizontal.style.top = armsPositions[pos].horizontal.value;
    armVertical.style.left = armsPositions[pos].vertical.value;

    // Optionally, remove the class after the transition has completed
    setTimeout(() => {
        armHorizontal.classList.remove('arm-transition-horizontal');
        armVertical.classList.remove('arm-transition-vertical');
    }, 1000); // Remove the class after 1 second
}