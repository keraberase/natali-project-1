// Обработчик вращения изображения при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const basisHead = document.querySelector('.basis-head');
    let rotation = 0;

    if (basisHead) {
        window.addEventListener('scroll', () => {
            const section = document.querySelector('.basis');
            if (section) {
                const sectionRect = section.getBoundingClientRect();

                // Проверка, видима ли секция
                if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                    const scrollY = window.scrollY - sectionRect.top + sectionRect.height; // Корректировка
                    rotation = scrollY * 0.1; // Настройка коэффициента

                    // Применяем вращение к изображению
                    basisHead.style.transform = `translate(-50%, 0) rotate(${rotation}deg)`;
                } else {
                    // Сбрасываем вращение, если секция не видима
                    basisHead.style.transform = `translate(-50%, 0) rotate(0deg)`;
                }
            }
        });
    }
});

// Слайдер для сертификатов
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.certificates-wrapper');
    const certificates = document.querySelectorAll('.certificate');
    let currentIndex = 0;
    const certificateWidth = 365; // Установите ширину сертификата 365px

    if (slider && certificates.length > 0) {
        // Функция для обновления позиции прокрутки
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

        // Автоматическая прокрутка
        let scrollInterval = setInterval(scrollRight, 3000); // Прокрутка каждые 3 секунды

        // Останавливаем автоматическую прокрутку при наведении
        slider.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });

        // Возобновляем прокрутку при уходе курсора
        slider.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(scrollRight, 3000);
        });

        // Обработчик кликов на слайдере
        slider.addEventListener('click', (event) => {
            const rect = slider.getBoundingClientRect();
            const clickX = event.clientX - rect.left; // Координата X на слайдере

            if (clickX < rect.width / 2) {
                scrollLeft(); // Прокрутка влево
            } else {
                scrollRight(); // Прокрутка вправо
            }
        });
    }
});

// Инициализация Swiper
document.addEventListener('DOMContentLoaded', () => {
    const swiperContainer = document.querySelector('.swiper-container');

    if (swiperContainer) {
        const swiper = new Swiper(swiperContainer, {
            slidesPerView: 1,  // Показывать один слайд на экране по умолчанию
            spaceBetween: 10,  // Отступы между слайдами
            centeredSlides: true,  // Центральный слайд всегда по центру
            loop: true,  // Зацикливание слайдов
            grabCursor: true,  // Курсор в виде "руки"
            breakpoints: {
                768: {
                    slidesPerView: 1,  // Один слайд на мобильных устройствах
                },
                1024: {
                    slidesPerView: 3,  // Три слайда на планшетах и больших экранах
                },
            },
            effect: 'coverflow',  // Эффект 3D карусели
            coverflowEffect: {
                rotate: 0,  // Поворот карточек
                stretch: 0,  // Растяжение
                depth: 100,  // Глубина для 3D эффекта
                modifier: 1,  // Модификатор для 3D эффекта
                slideShadows: false,  // Без теней
            },
        });
    }
});

// Модальное окно для сертификатов
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

// Создаем изображение для модального окна
const modalImg = document.createElement('img');
modal.appendChild(modalImg);

// Закрытие модального окна при клике вне изображения
modal.addEventListener('click', (event) => {
    if (event.target !== modalImg) {
        modal.style.display = 'none'; // Скрываем модальное окно
    }
});

// Обработчик кликов на сертификатах
document.querySelectorAll('.certificate-image').forEach((image) => {
    image.addEventListener('click', () => {
        const highResSrc = image.getAttribute('data-full'); // Получаем 2x версию изображения
        modalImg.src = highResSrc; // Устанавливаем источник изображения в модальном окне
        modal.style.display = 'flex'; // Показываем модальное окно
    });
});