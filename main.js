import $ from 'jquery';

// Обработчик вращения изображений при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const basisHead = document.querySelector('.basis-head');
    const aboutMeHead = document.querySelector('.about-me-head');

    // Проверяем наличие элементов перед добавлением события
    if (basisHead || aboutMeHead) {
        window.addEventListener('scroll', () => {
            // Обработка вращения для .basis-head
            const basisSection = document.querySelector('.basis');
            if (basisHead && basisSection) {
                const { top, bottom, height } = basisSection.getBoundingClientRect();
                const isVisible = top < window.innerHeight && bottom > 0;

                basisHead.style.transform = isVisible
                    ? `translate(-50%, 0) rotate(${(window.scrollY - top + height) * 0.1}deg)`
                    : 'translate(-50%, 0) rotate(0deg)';
            }

            // Обработка вращения для .about-me-head
            const aboutMeSection = document.querySelector('.image-container-about-me');
            if (aboutMeHead && aboutMeSection) {
                const { top, bottom, height } = aboutMeSection.getBoundingClientRect();
                const isVisible = top < window.innerHeight && bottom > 0;

                aboutMeHead.style.transform = isVisible
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

document.querySelectorAll('.telegram-btn').forEach(button => {
    button.addEventListener('click', function() {
        window.open('https://t.me/natalyabotyanovskaya', '_blank');
    });
});

$(document).ready(function() {
    $("#instagramLink").on("click", function(event) {
        event.preventDefault(); // Предотвращаем переход по умолчанию

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const appLink = "instagram://user?username=natalya_botyanovska_psy";
        const webLink = "https://www.instagram.com/natalya_botyanovska_psy?igsh=MWk5bDQ5NnJrZ28xZw==";

        if (isMobile) {
            // Создаем скрытый элемент для попытки открытия приложения
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Пытаемся открыть приложение Instagram
            iframe.src = appLink;

            // Удаляем iframe после небольшой задержки
            setTimeout(function() {
                document.body.removeChild(iframe);
                // Если приложение не открылось, открываем веб-версию
                window.location.href = webLink; 
            }, 1000); // 1 секунда на открытие приложения
        } else {
            window.open(webLink, "_blank"); // Открываем веб-версию для десктопа
        }
    });
});