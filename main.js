// Обработчик вращения изображения при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const basisHead = document.querySelector('.basis-head');
    if (basisHead) {
        window.addEventListener('scroll', () => {
            const section = document.querySelector('.basis');
            if (section) {
                const { top, bottom, height } = section.getBoundingClientRect();
                const isVisible = top < window.innerHeight && bottom > 0;

                basisHead.style.transform = isVisible
                    ? `translate(-50%, 0) rotate(${(window.scrollY - top + height) * 0.1}deg)`
                    : 'translate(-50%, 0) rotate(0deg)';
            }
        });
    }
});

// Слайдер для сертификатов
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.certificates-wrapper');
    const certificates = document.querySelectorAll('.Сertificate');
    let currentIndex = 0;
    const certificateWidth = 365; // Установите ширину сертификата 365px

    if (slider && certificates.length > 0) {
        const updateScrollPosition = () => {
            slider.style.transform = `translateX(${-currentIndex * certificateWidth}px)`; // Прокрутка
        };

        const scroll = (direction) => {
            currentIndex = (currentIndex + direction + certificates.length) % certificates.length; // Зацикливание
            updateScrollPosition();
        };

        // Автоматическая прокрутка
        let scrollInterval = setInterval(() => scroll(1), 3000); // Прокрутка каждые 3 секунды

        // Остановка и возобновление прокрутки
        slider.addEventListener('mouseenter', () => clearInterval(scrollInterval));
        slider.addEventListener('mouseleave', () => scrollInterval = setInterval(() => scroll(1), 3000));
        slider.addEventListener('click', (event) => {
            const clickX = event.clientX - slider.getBoundingClientRect().left;
            scroll(clickX < slider.clientWidth / 2 ? -1 : 1); // Прокрутка влево или вправо
        });
    }
});

// Инициализация Swiper
document.addEventListener('DOMContentLoaded', () => {
    const swiperContainer = document.querySelector('.swiper-container');

    if (swiperContainer) {
        new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
            loop: true,
            grabCursor: true,
            breakpoints: {
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 3 },
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
        });
    }
});

// Модальное окно для сертификатов
const modal = document.createElement('div');
modal.classList.add('modal');
modal.style.display = 'none'; // Изначально скрыто
document.body.appendChild(modal);

const modalImg = document.createElement('img');
modal.appendChild(modalImg);

// Переменная для текущего индекса изображения
let currentImageIndex = 0;

// Обработчик закрытия модального окна при клике вне изображения
modal.addEventListener('click', (event) => {
    if (event.target !== modalImg) {
        modal.style.display = 'none';
    }
});

// Обработчик кликов на сертификатах
document.querySelectorAll('.certificate-image').forEach((image, index) => {
    image.addEventListener('click', () => {
        const highResSrc = image.getAttribute('data-full');
        if (highResSrc) { // Проверка на наличие изображения
            modalImg.src = highResSrc;
            modal.style.display = 'flex';
            currentImageIndex = index; // Установка текущего индекса
        } else {
            console.error('Изображение не найдено по пути:', highResSrc);
        }
    });
});

// Закрытие модального окна при нажатии Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});
