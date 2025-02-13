const quotes = [
    "Любовь - это когда счастье другого важнее твоего собственного.",
    "В твоих глазах я вижу своё будущее.",
    "Ты - причина моей улыбки каждый день.",
    "Моё сердце бьётся в ритме твоего имени.",
    "С тобой даже обычный день становится особенным.",
    "Ты делаешь мою жизнь полной красок.",
    "Я влюбляюсь в тебя каждый день заново.",
    "Ты - мой любимый человек во всей вселенной.",
    "Каждый момент с тобой - это маленькое чудо.",
    "Ты - моё самое любимое приключение.",
    "С тобой я чувствую себя по-настоящему живым.",
    "Ты - мой самый любимый сон, ставший явью."
];

const loveFacts = [
    "Сердце человека бьется быстрее при виде любимого человека.",
    "Влюбленные люди имеют схожий сердечный ритм.",
    "Объятия длиной в 20 секунд делают людей счастливее.",
    "Любовь активирует те же зоны мозга, что и шоколад.",
    "Взгляд в глаза любимого человека вызывает выброс окситоцина.",
    "Любовь может облегчать физическую боль.",
    "Чувство бабочек в животе вызвано адреналином.",
    "Влюбленные пары начинают походить друг на друга.",
    "Разлука усиливает романтические чувства.",
    "Любовь делает людей более креативными.",
    "Поцелуй сжигает около 6.4 калорий в минуту.",
    "Обнимать любимого человека полезно для здоровья."
];

const colors = [
    ['#FF1493', '#FF69B4'],  // Яркий розовый градиент
    ['#FF4500', '#FF8C00'],  // Оранжевый градиент
    ['#FF0000', '#FF6B6B'],  // Красный градиент
    ['#FF1744', '#FF616F'],  // Малиновый градиент
    ['#FF4081', '#FF80AB']   // Розовый градиент
];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateContent() {
    const quote = getRandomItem(quotes);
    const fact = getRandomItem(loveFacts);
    const [color1, color2] = getRandomItem(colors);
    
    document.querySelector('.quote').textContent = quote;
    document.querySelector('.love-fact').textContent = fact;
    document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
}

let heartCount = 0;
const maxHearts = 50; // Максимальное количество сердец на экране

function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const hearts = ['❤️', '💖', '💝', '💕', '💗', '💓', '💘', '💞', '💟', '♥️'];
    const colors = [
        '#ff6b6b',
        '#ff8787',
        '#ffa8a8',
        '#ffc9c9',
        '#ff4d4d',
        '#ff3333',
        '#ff1a1a',
        '#ff0000',
        '#ff66b2',
        '#ff3399'
    ];
    
    // Определяем, является ли устройство мобильным
    const isMobile = window.innerWidth <= 600;
    
    // Настраиваем параметры в зависимости от устройства
    const config = {
        initialHearts: isMobile ? 20 : 50,
        interval: isMobile ? 200 : 100,
        minDuration: isMobile ? 2 : 3,
        maxDuration: isMobile ? 4 : 7,
        minSize: isMobile ? 1 : 1.5,
        maxSize: isMobile ? 2 : 3.5
    };
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = getRandomItem(hearts);
        
        // Случайная начальная позиция с четырех сторон
        const side = Math.floor(Math.random() * 4);
        let startPosition;
        
        switch(side) {
            case 0: // сверху
                startPosition = { left: Math.random() * 100 + 'vw', top: '-5vh' };
                break;
            case 1: // справа
                startPosition = { left: '105vw', top: Math.random() * 100 + 'vh' };
                break;
            case 2: // снизу
                startPosition = { left: Math.random() * 100 + 'vw', top: '105vh' };
                break;
            case 3: // слева
                startPosition = { left: '-5vw', top: Math.random() * 100 + 'vh' };
                break;
        }
        
        heart.style.left = startPosition.left;
        heart.style.top = startPosition.top;
        
        // Случайный размер и цвет
        const size = config.minSize + Math.random() * (config.maxSize - config.minSize);
        heart.style.fontSize = size + 'rem';
        heart.style.color = getRandomItem(colors);
        
        // Случайное время анимации
        const duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
        heart.style.transition = `all ${duration}s ease-in-out`;
        
        // Добавляем сердечко в контейнер
        heartsContainer.appendChild(heart);
        
        // Задаем конечную позицию через небольшую задержку
        setTimeout(() => {
            // Двигаем в противоположную сторону
            let targetX, targetY;
            switch(side) {
                case 0: // сверху -> вниз
                    targetX = Math.random() * 100 + 'vw';
                    targetY = '105vh';
                    break;
                case 1: // справа -> влево
                    targetX = '-5vw';
                    targetY = Math.random() * 100 + 'vh';
                    break;
                case 2: // снизу -> вверх
                    targetX = Math.random() * 100 + 'vw';
                    targetY = '-5vh';
                    break;
                case 3: // слева -> вправо
                    targetX = '105vw';
                    targetY = Math.random() * 100 + 'vh';
                    break;
            }
            
            const rotation = Math.random() * 360 - 180; // Уменьшаем вращение на мобильных
            const scale = 0.8 + Math.random() * 0.4; // Меньший диапазон масштабирования
            heart.style.transform = `translate(${targetX}, ${targetY}) rotate(${rotation}deg) scale(${scale})`;
        }, 50);
        
        // Удаляем сердечко после завершения анимации
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Создаем начальные сердечки
    for (let i = 0; i < config.initialHearts; i++) {
        setTimeout(() => createHeart(), Math.random() * 1000);
    }
    
    // Продолжаем создавать новые сердечки
    setInterval(createHeart, config.interval);
    
    // Обновляем конфигурацию при изменении размера окна
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 600;
        if (newIsMobile !== isMobile) {
            location.reload(); // Перезагружаем страницу для применения новых настроек
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

function addSparkleEffect(element) {
    element.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) { // Создаем искры только иногда
            const rect = element.getBoundingClientRect();
            createSparkle(e.clientX, e.clientY);
        }
    });
}

function initializeCard() {
    updateContent();
    createFloatingHearts();
    
    const mainHeart = document.querySelector('#mainHeart');
    const card = document.querySelector('.valentine-card');
    
    mainHeart.addEventListener('click', function(e) {
        this.classList.add('heart-click');
        for(let i = 0; i < 15; i++) {
            setTimeout(() => {
                createSparkle(
                    e.clientX + (Math.random() - 0.5) * 150,
                    e.clientY + (Math.random() - 0.5) * 150
                );
            }, i * 100);
        }
        setTimeout(() => this.classList.remove('heart-click'), 1000);
    });

    // 3D эффект для карточки
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Добавляем эффект искр
    addSparkleEffect(document.querySelector('.quote'));
    addSparkleEffect(document.querySelector('.love-fact'));
    
    // Добавляем обработку касаний для мобильных устройств
    card.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        createSparkle(touch.clientX, touch.clientY);
    });
}

// Запускаем инициализацию при загрузке страницы
window.addEventListener('load', initializeCard);