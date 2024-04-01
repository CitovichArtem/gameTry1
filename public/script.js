// Получение контекста канваса
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.font = '20px Arial';

// Создаем новый объект Image
const cop = new Image();
cop.src = '../images/коп360.png';
const vor = new Image();
vor.src = '../images/мошенник360.png';

// Определение переменных для игрового состояния
let energyM = 10; // Энергия на старте
let starsM = 0;   // Количество звезд на старте
let energyC = 10; // Энергия на старте
let starsC = 0;   // Количество звезд на старте

let gameTime = 0; // Время игры в секундах
let selectedCharacter = ''; // Выбранный персонаж

// Функция отрисовки игры
function draw() {
    // Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка игровых объектов и интерфейса
    drawInterface();
}

// Функция отрисовки интерфейса игры
function drawInterface() {
    // Отрисовка верхнего меню
    

    // Отрисовка кнопок выбора персонажа
    if (!selectedCharacter) {
        // Ждем загрузки изображения
        ctx.drawImage(cop, 430, 210);
        ctx.drawImage(vor, 30, 220);
        
        ctx.fillStyle = 'white';
        ctx.fillText('выбери своего персонажа', 270, 120);
        ctx.fillStyle = '#031612';
        ctx.fillRect(175, 150, 200, 50);
        ctx.fillStyle = 'white';
        ctx.fillText('Мошенник', 225, 182);
        ctx.fillStyle = '#031612';
        ctx.fillRect(425, 150, 200, 50);
        ctx.fillStyle = 'white';
        ctx.fillText('Суперкоп', 475, 182);
        
    } else {
        if(selectedCharacter == 'Мошенник'){
            ctx.fillText(`Энергия: ${energyM}`, 20, 30);
            ctx.fillText(`Звезды: ${starsM}`, 20, 60);
            ctx.fillText(`Время: ${gameTime} сек`, 20, 90);
            ctx.fillStyle = 'black';
            ctx.fillRect(200, 150, 400, 50);
            ctx.fillRect(200, 250, 400, 50);
            ctx.fillRect(200, 350, 400, 50);
            ctx.fillRect(50, 500, 200, 50);
            ctx.fillStyle = 'white';
            ctx.fillText('Добро пожаловать на тёмную сторону', 220, 120);
            ctx.fillText('Выбрать способ мошенничества', 250, 180);
            ctx.fillText('Найти очередную лохушку-жертву', 250, 280);
            ctx.fillText('Облапошить по полной жетрву', 250, 380);
            ctx.fillText('Вернуться в меню', 65, 530);
            
        }else if(selectedCharacter == 'Суперкоп'){
            ctx.fillText(`Энергия: ${energyC}`, 20, 30);
            ctx.fillText(`Звезды: ${starsC}`, 20, 60);
            ctx.fillText(`Время: ${gameTime} сек`, 20, 90);
            ctx.drawImage(cop, 430, 210);
            ctx.fillStyle = 'black';
            ctx.fillRect(200, 150, 400, 50);
            ctx.fillRect(200, 250, 400, 50);
            ctx.fillRect(200, 350, 400, 50);
            ctx.fillRect(50, 500, 200, 50);
            
            ctx.fillStyle = 'white';
            ctx.fillText('Выбрать способ поимки', 270, 180);
            ctx.fillText('Найти очередного негодяя', 270, 280);
            ctx.fillText('Наказать по полной негодяя', 270, 380);
            ctx.fillText('Время наказать мошенников', 270, 120);
            ctx.fillText('Вернуться в меню', 65, 530);
        }else{
            console.log('Ошибка с переменной selectedCharacter');
        }
    }
}

// Обработчик клика по кнопкам выбора персонажа
canvas.addEventListener('click', function(event) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    // Проверяем, попали ли мы на кнопку выбора персонажа
    if (!selectedCharacter && y >= 150 && y <= 200) {
        if (x >= 175 && x <= 375) {
            // Выбран мошенник
            selectedCharacter = 'Мошенник';
            console.log('Выбран мошенник');
        } else if (x >= 425 && x <= 625) {
            // Выбран суперкоп
            selectedCharacter = 'Суперкоп';
            console.log('Выбран суперкоп');
        }
    }
    if (selectedCharacter){
        if (x >= 50 && x <= 250 && y >= 500 && y <= 550){
            selectedCharacter = '';
            console.log('Выход в меню');
        }
    }
});

// Функция основного игрового цикла
function gameLoop() {
    // Обновление игрового времени
    gameTime++;

    // Проверка энергии и восстановление
    if (energyM < 10) {
        energyM++;
    }
    if (energyC < 10) {
        energyC++;
    }

    // Отрисовка игры
    draw();

    // Повторный вызов игрового цикла через requestAnimationFrame
    requestAnimationFrame(gameLoop);
}

// Начало игры
gameLoop();