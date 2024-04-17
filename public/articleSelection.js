import { drawButton} from './button.js';
import { canvas, ctx, font,canvasWidth, canvasHeight, changeSelectedCharacter, list} from './game.js';
import { wrapText, MyText, Questions, answers } from './text.js';

export let  selectedArticle = 0;

let answerFeedBack;
export let numberAnswer = -1;
export const drawArticle = (text, nameArticle) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    MyText(nameArticle, 0, 0.1*canvasHeight, '#ffffff', font, 'Montserrat', 'center');
    drawButton(0.055*canvasWidth, 0.125 * canvasHeight, 0.89*canvasWidth, 0.74*canvasHeight, '',font, false);
    wrapText(ctx, text, 0.095*canvasWidth,0.175 * canvasHeight,0.85*canvasWidth, font);
    drawButton(0.1 * canvasWidth, 0.88 * canvasHeight, 0.32 * canvasWidth, 0.08 * canvasHeight, 'Меню', 0.03 * canvasHeight, false);
    drawButton(0.6 * canvasWidth, 0.88 * canvasHeight, 0.32 * canvasWidth, 0.08 * canvasHeight, '<        >', 0.03 * canvasHeight, false);
    drawButton(0.44 * canvasWidth, 0.88 * canvasHeight, 0.14 * canvasWidth, 0.08 * canvasHeight, '$$$', 0.03 * canvasHeight, false);
};
export function changeNumberAnswer(x){
    numberAnswer = x;
}
export const handleArticleSelection = (y) => {
    console.log('попали в выбор статьи...');
    changeSelectedCharacter('Article');
    
    switch(true){
        case (y>= 0.135 * canvasHeight && y<= 0.238 * canvasHeight):
            selectedArticle = 1;
            console.log(selectedArticle);
            break;
        case (y>= 0.238 * canvasHeight && y<= 0.341 * canvasHeight):
            selectedArticle = 2;
            console.log(selectedArticle);
            break;
        case (y>= 0.341 * canvasHeight && y<= 0.444 * canvasHeight):
            selectedArticle = 3;
            console.log(selectedArticle);
            break;
        case (y>= 0.444 * canvasHeight && y<= 0.547 * canvasHeight):
            selectedArticle = 4;
            console.log(selectedArticle);
            break;
        case (y>= 0.547 * canvasHeight && y<= 0.650 * canvasHeight):
            selectedArticle = 5;
            console.log(selectedArticle);
            break;
        case (y>= 0.650 * canvasHeight && y<= 0.753 * canvasHeight):
            selectedArticle = 6;
            console.log(selectedArticle);
            break;
        case (y>= 0.753 * canvasHeight && y<= 0.856 * canvasHeight):
            selectedArticle = 7;
            console.log(selectedArticle);
            break;
    }
    console.log('выбрали статью');
};

export function drawQuestion(text){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    MyText('$ Спец.вопрос $', 0, 0.1*canvasHeight, '#ffffff', font, 'Montserrat', 'center');
    drawButton(0.055*canvasWidth, 0.125 * canvasHeight, 0.89*canvasWidth, 0.74*canvasHeight, '',font, false);
    wrapText(ctx, text, 0.095*canvasWidth,0.175 * canvasHeight,0.85*canvasWidth, font);
    let x=0.13*canvasWidth, y = 0.475 * canvasHeight;
    answers[selectedArticle-1][list].slice(0, -1).forEach(answer => {
        drawButton(x, y, 0.74*canvasWidth, 0.08*canvasHeight, answer,font, false);
        y += 0.10*canvasHeight; // Увеличиваем y для отображения следующего варианта ответа
    });
    
}
export function drawAnswer(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawButton(0.055*canvasWidth, 0.125 * canvasHeight, 0.89*canvasWidth, 0.74*canvasHeight, '',font, false);
    drawButton(0.1 * canvasWidth, 0.88 * canvasHeight, 0.32 * canvasWidth, 0.08 * canvasHeight, 'Меню', 0.03 * canvasHeight, false);
    if (numberAnswer !== -1){
        checkAnswer(numberAnswer);
    }
}
function checkAnswer(numberAnswer){
    let textColor;
    if (numberAnswer === answers[selectedArticle-1][list][3]){
        answerFeedBack = 'ОТВЕТ ВЕРНЫЙ';
        textColor = 'green';
    }else{
        answerFeedBack = 'ОТВЕТ НЕВЕРНЫЙ';
        textColor = 'red';
    }
    
    MyText(answerFeedBack, 0, 0.19*canvasHeight, textColor, font, 'Montserrat', 'center');
    MyText('Выйди в меню', 0, 0.22*canvasHeight, '#ffffff', font, 'Montserrat', 'center');
}