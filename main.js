const basisHead = document.querySelector('.basis-head');
let rotation = 0;

window.addEventListener('scroll', () => {
    const section = document.querySelector('.basis');
    const sectionRect = section.getBoundingClientRect();

    // Проверка, видима ли секция
    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
        const scrollY = window.scrollY - sectionRect.top + sectionRect.height; // Добавьте высоту секции для корректировки
        rotation = scrollY * 0.1; // Настройте коэффициент по необходимости

        // Применяем вращение к изображению
        basisHead.style.transform = `translate(-50%, 0) rotate(${rotation}deg)`; // Убедитесь, что здесь translate Y равен 0
    } else {
        // Сбрасываем вращение, если секция не видима
        basisHead.style.transform = `translate(-50%, 0) rotate(0deg)`;
    }
});


const slider = document.querySelector('.certificates-wrapper');
const certificates = document.querySelectorAll('.certificate'); // Получаем все сертификаты
let currentIndex = 0; // Индекс текущего сертификата
const certificateWidth = 220; // Ширина сертификата (с отступами)

// Обновляем позицию прокрутки
function updateScrollPosition() {
    slider.style.transform = `translateX(${-currentIndex * certificateWidth}px)`; // Прокрутка
}

// Функция для прокрутки влево
function scrollLeft() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = certificates.length - 1; // Возвращаемся к последнему
    }
    updateScrollPosition();
}

// Функция для прокрутки вправо
function scrollRight() {
    currentIndex++;
    if (currentIndex >= certificates.length) {
        currentIndex = 0; // Возвращаемся к первому
    }
    updateScrollPosition();
}

// Запускаем автоматическую прокрутку
let scrollInterval = setInterval(scrollRight, 3000); // Прокрутка каждые 3 секунды

// Останавливаем автоматическую прокрутку при наведении
slider.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
});

// Возобновляем прокрутку при уходе курсора
slider.addEventListener('mouseleave', () => {
    scrollInterval = setInterval(scrollRight, 3000);
});

// Добавляем обработчики для прокрутки
slider.addEventListener('click', (event) => {
    // Проверяем, где было нажатие
    const rect = slider.getBoundingClientRect();
    const clickX = event.clientX - rect.left; // Координата X на слайдере

    // Если клик в левой части, прокручиваем влево
    if (clickX < rect.width / 2) {
        scrollLeft();
    } else { // Если клик в правой части, прокручиваем вправо
        scrollRight();
    }
});
