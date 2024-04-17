//вроде бы разделение работает
import {images} from './resources.js';
import { drawButton } from './button.js';
import { handleCharacterSelection } from './characterSelection.js';
import { drawArticle, handleArticleSelection, selectedArticle, drawQuestion,changeNumberAnswer, drawAnswer } from './articleSelection.js';
import { TestText, nameArticle, MyText, Questions } from './text.js';
export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');
export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;
export let font = canvasHeight / 30;
export let list = 0;
export let selectedCharacter = '', timerInterval, multiplier = 1;
export function changeSelectedCharacter(value){
    selectedCharacter = value;
}


function formatNum(num) {
    const suffixes = ['', 'K', 'M', 'B', 'T', 'q', 'Q', 's', 'S' ];
    const suffixNum = Math.floor(('' + num).length / 3);
    let shortNum = parseFloat((suffixNum != 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(3));
    if (shortNum % 1 != 0) {
        shortNum = shortNum.toFixed(1);
    }
    return shortNum + suffixes[suffixNum];
}



export let characters2 = {
    
    "Мошенник": { energy: 10, stars: 0, isHavingPeoples: false, image: images["Мошенник"], needStars: 3, multiplier: 1},
    "Суперкоп": { energy: 10, stars: 0, isHavingPeoples: false, image: images["Суперкоп"], needStars: 3, multiplier: 1 }
};

export let characters = {
    
    "Мошенник": { energy: 10, stars: 0, isHavingPeoples: false, image: images["Мошенник"], needStars: 3, multiplier: 1},
    "Суперкоп": { energy: 10, stars: 0, isHavingPeoples: false, image: images["Суперкоп"], needStars: 3, multiplier: 1 }
};
// Получаем данные из локального хранилища, если они там есть
let charactersString = localStorage.getItem('characters');
if (charactersString) {
    characters = JSON.parse(charactersString);
} else {
    // Если данных в хранилище нет, сохраняем текущее состояние characters
    localStorage.setItem('characters', JSON.stringify(characters));
}
const ACTIONS = {
    'Способ': 'range1',
    'Найти': 'range2',
    'Наказать': 'range3'
};

Promise.all(Object.values(images).map(image => new Promise(resolve => {
    image.onload = resolve;
}))).then(() => {
    gameLoop();
});

function drawCharacterSelectionButtons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(images[1], 0.47*canvasWidth, canvasHeight - (0.33*canvasHeight), 0.33*canvasHeight , 0.33*canvasHeight );
    ctx.drawImage(images[0], 0, canvasHeight - (0.33*canvasHeight), 0.33*canvasHeight, 0.33*canvasHeight);
    MyText('ВЫБЕРИ СВОЕГО ПЕРСОНАЖА', 0, 0.1*canvasHeight, '#ffffff', font, 'Montserrat', 'center');
    drawButton(0.2*canvasWidth, 0.18*canvasHeight, 0.6*canvasWidth, 0.10*canvasHeight, 'Мошенник', 0.045*canvasHeight);
    drawButton(0.2*canvasWidth, 0.30*canvasHeight, 0.6*canvasWidth, 0.10*canvasHeight, 'Суперкоп', 0.045*canvasHeight);
    MyText('ИЛИ', 230, 0.44*canvasHeight, '#ffffff', font, 'Montserrat', 'center');
    drawButton(0.2*canvasWidth, 0.46*canvasHeight, 0.6*canvasWidth, 0.10*canvasHeight, 'Улучшить навыки', 0.045*canvasHeight);
}

function drawCharacterInterface(character) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    MyText(`Энергия: ${formatNum(character.energy)} / 10`, 0.016*canvasHeight, 0.04*canvasHeight, '#ffffff', font, 'Montserrat',);
    MyText(`Звезды: ${formatNum(character.stars)}`, 0.016*canvasHeight, 0.075*canvasHeight, '#ffffff', font, 'Montserrat');
    //drawButton(0.2*canvasWidth, 0.28*canvasHeight, 0.6*canvasWidth, 0.10*canvasHeight, 'Мошенник');
    //drawButton(0.2*canvasWidth, 0.40*canvasHeight, 0.6*canvasWidth, 0.10*canvasHeight, 'Суперкоп');
    const buttons = [
        { x: 0.1*canvasWidth, y: 0.18*canvasHeight, width: 0.8*canvasWidth, height: 0.10*canvasHeight, text: `${selectedCharacter === 'Мошенник' ? 'Улучшить способ аферы' : 'Улучшить способ поимки'} ${formatNum(character.needStars)}`, isDisabled: (character.stars < character.needStars) },
        { x: 0.1*canvasWidth, y: 0.88*canvasHeight, width: 0.32*canvasWidth, height: 0.08*canvasHeight, text: 'МЕНЮ', isDisabled: false },
        { x: 0.1*canvasWidth, y: 0.32*canvasHeight, width: 0.8*canvasWidth, height: 0.10*canvasHeight, text: selectedCharacter === 'Мошенник' ? 'Найти  жертву' : 'Найти  негодяя', isDisabled: (character.energy <= 0 || characters[selectedCharacter].isHavingPeoples) },
        { x: 0.1*canvasWidth, y: 0.46*canvasHeight, width: 0.8*canvasWidth, height: 0.10*canvasHeight, text: selectedCharacter === 'Мошенник' ? 'Облапошить  жертву' : 'Наказать  негодяя', isDisabled: (character.energy <= 0 || !characters[selectedCharacter].isHavingPeoples)}
    ];

    buttons.forEach(button => {
        drawButton(button.x, button.y, button.width, button.height, button.text, 0.45*button.height, button.isDisabled);
    });

    MyText(selectedCharacter === 'Мошенник' ? 'ПОРА НАЖИВИТЬСЯ' : 'ПОРА НАКАЗЫВАТЬ', 0, 0.13*canvasHeight, '#ffffff', font, 'Montserrat', 'center'); 
    ctx.drawImage(selectedCharacter === 'Мошенник' ? images[0] : images[1], canvasWidth - (0.33*canvasHeight), canvasHeight - (0.33*canvasHeight), 0.33*canvasHeight, 0.33*canvasHeight);

}

function drawUpSkills(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    MyText('ПОЛЕЗНЫЕ МАТЕРИАЛЫ', 0, 0.1*canvasHeight, '#ffffff', font, 'Montserrat', 'center');
    const buttonHeight = 0.103 * canvasHeight;
    const buttonSpacing = 0.103 * canvasHeight;
    const buttonCount = 7;
    const startY = 0.135 * canvasHeight;
    const articles = ['Основы кибербезопасности', 'Пароли и аутентификация', 'Социальная инженерия',
                      'Защита персон-х данных','Сетевая безопасность','Защита устройств', 
                      'Безопасность в Интернете']
    drawButton(0.055*canvasWidth, 0.125 * canvasHeight, 0.89*canvasWidth, 0.74*canvasHeight, '',font*1.26, false);
    for (let i = 0; i < buttonCount; i++) {
        const buttonY = startY + i * buttonSpacing;
        drawButton(0.07 * canvasWidth, buttonY, 0.86 * canvasWidth, buttonHeight, `${articles[i]}`, font * 0.96, false);
    }
    drawButton(0.1 * canvasWidth, 0.88 * canvasHeight, 0.32 * canvasWidth, 0.08 * canvasHeight, 'Меню', 0.03 * canvasHeight, false);

}

function handleCharacterAction(y) {
    const actionType = getActionByRange(y, characters[selectedCharacter].isHavingPeoples);
    if (actionType) {
        console.log(`Действие ${selectedCharacter.toLowerCase()}: ${actionType}`);
    }
    ActionHandler(selectedCharacter, actionType);
}

function handleMenuExit() {
    changeSelectedCharacter('');
    clearInterval(timerInterval); 
    list = 0;
    draw(); 
    console.log('Выход в меню');
}

function getActionByRange(y, isHavingPeoples) {
    if (y >= 0.18*canvasHeight && y <= 0.28*canvasHeight && characters[selectedCharacter].stars >= characters[selectedCharacter].needStars) {
        return ACTIONS['Способ'];
    } else if (y >= 0.32*canvasHeight && y <= 0.42*canvasHeight && !isHavingPeoples) {
        return ACTIONS['Найти'];
    } else if (y >= 0.46*canvasHeight && y <= 0.56*canvasHeight && isHavingPeoples) {
        return ACTIONS['Наказать'];
    }
}

const ActionHandler = (selectedCharacter, actionType) => {
    const character = characters[selectedCharacter];
    switch (actionType) {
        case ACTIONS['Способ']:
            character.stars -= character.needStars;
            character.multiplier *= 2;
            character.needStars *= 3;
            character.energy = 10;
            console.log('Обнулили звёзды. Заполнили Энергию. повысили множитель и порог: ' + character.multiplier + ' , ' + character.needStars);
            break;
        case ACTIONS['Найти']:
            if (character.energy > 0) {
                character.energy--;
                character.isHavingPeoples = true;
            }
            break;
        case ACTIONS['Наказать']:
            if (character.energy > 0) {
                character.energy--;
                character.stars += character.multiplier;
                character.isHavingPeoples = false;
            }
            break;
        default:
            console.log('Ошибка с типом действия ' + selectedCharacter + ' ' + actionType);
    }
}
canvas.addEventListener('click', handleCanvasClick);

function handleCanvasClick(event) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    console.log(x,y);
    switch (true) {
        case !selectedCharacter && x >= 0.2*canvasWidth && x <= 0.8*canvasWidth:
            console.log(selectedCharacter);
            handleCharacterSelection(y);
            break;
        case selectedCharacter && x >= 0.1*canvasWidth && x <= 0.42*canvasWidth && y >= 0.88*canvasHeight && y <= 1*canvasHeight:
            console.log(selectedCharacter);
            handleMenuExit();
            break;
        case (selectedCharacter==='Мошенник' || selectedCharacter==='Суперкоп') && x >= 0.1*canvasWidth && x <= 0.9*canvasWidth:
            console.log(selectedCharacter);
            handleCharacterAction(y);
            break; 
        case selectedCharacter==='Материалы' && x >= 0.07*canvasWidth && x <= 0.86*canvasWidth:
            console.log(selectedCharacter);
            handleArticleSelection(y);
            break;
        case selectedCharacter === 'Article':
            if (y >= 0.88 * canvasHeight && y <= 0.96 * canvasHeight) {
                if (x >= 0.6 * canvasWidth && x <= 0.76 * canvasWidth) {
                    console.log(selectedCharacter);
                    if (list >= 1) {
                        list--;
                    }
                } else if (x >= 0.76 * canvasWidth && x <= 0.92 * canvasWidth) {
                    console.log(selectedCharacter);
                    if (list <= TestText[selectedArticle - 1].length - 2) {
                        list++;
                    }
                } else if (x >= 0.44 * canvasWidth && x <= 0.56 * canvasWidth) {
                    selectedCharacter = 'Question';
                    console.log(selectedCharacter);
                }
            }
            break;
        case selectedCharacter === 'Question' && x >= 0.13*canvasWidth && x <= 0.87*canvasWidth :
            if(y >= 0.475 * canvasHeight && y <= 0.555*canvasHeight){
                changeNumberAnswer(0);
                selectedCharacter = 'Answer';
            }else if(y >= 0.575 * canvasHeight && y <= 0.655*canvasHeight){
                changeNumberAnswer(1);
                selectedCharacter = 'Answer';
            }else if(y >= 0.675*canvasHeight && y <= 0.755*canvasHeight){
                changeNumberAnswer(2);
                selectedCharacter = 'Answer';
            }
            break;
        default:
            break;
    }
}

export const draw = () => {
    if (!selectedCharacter) {
        drawCharacterSelectionButtons();
    } else if( selectedCharacter === 'Суперкоп' || selectedCharacter === 'Мошенник'){
        const character = characters[selectedCharacter];
        drawCharacterInterface(character);
    }else if (selectedCharacter === 'Материалы'){
        drawUpSkills();
    }else if (selectedCharacter === 'Article'){
        drawArticle(TestText[selectedArticle-1][list], nameArticle[[selectedArticle-1]]);
    }else if(selectedCharacter === 'Question'){
        drawQuestion(Questions[selectedArticle-1][list]);
    }else if(selectedCharacter === 'Answer'){
        drawAnswer();
    }
}



function gameLoop() {
    draw();
    localStorage.setItem('characters', JSON.stringify(characters));
    requestAnimationFrame(gameLoop);
}

