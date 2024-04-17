import {  characters, selectedCharacter, canvasHeight, changeSelectedCharacter, draw } from './game.js';
function startEnergyRecoveryTimer(character) {
    let timerInterval = setInterval(() => {
        if (character.energy < 10) {
            character.energy++;
            console.log(`Энергия восстановлена. Текущее значение: ${character.energy}`);
            draw();
        } else {
            clearInterval(timerInterval);
            console.log('Энергия полностью восстановлена.');
        }
    }, 10000); // 10 секунд
}
export const handleCharacterSelection = (y) => {
    if (y >= 0.18*canvasHeight && y <= 0.28*canvasHeight) {
        changeSelectedCharacter('Мошенник');
        console.log('Выбран мошенник');
    } else if (y >= 0.30*canvasHeight && y <= 0.40*canvasHeight) {
        changeSelectedCharacter('Суперкоп');
        console.log('Выбран суперкоп');
    }else if (y >= 0.46*canvasHeight && y <= 0.56*canvasHeight) {
        changeSelectedCharacter('Материалы');
        
    }
    if (selectedCharacter === 'Мошенник' || selectedCharacter === 'Суперкоп') {
        startEnergyRecoveryTimer(characters[selectedCharacter]);
        console.log(selectedCharacter);
    }
};

