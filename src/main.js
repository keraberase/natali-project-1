import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

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

   // Инициализация Swiper для слайдера сертификатов
const swiperContainer = document.querySelector('.swiper-container');
if (swiperContainer) {
    new Swiper(swiperContainer, {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000, // Автоматическая прокрутка каждые 3 секунды
            disableOnInteraction: false, // Останавливает прокрутку при взаимодействии
        },
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

// Функции для открытия и закрытия модального окна с изображением
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('img');

// Добавляем обработчики кликов на все изображения сертификатов
document.querySelectorAll('.certificate-image').forEach((image) => {
    image.addEventListener('click', () => {
        const highResSrc = image.getAttribute('data-full'); // Путь к высококачественному изображению
        openModal(highResSrc);
    });
});

// Функция для открытия модального окна
function openModal(imgSrc) {
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
}

// Закрытие модального окна при клике вне изображения или на клавишу "Escape"
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});


    // Кнопки для перехода на Telegram и Instagram
    document.querySelectorAll('.telegram-btn').forEach(button => {
        button.addEventListener('click', () => {
            window.open('https://t.me/natalyabotyanovskaya', '_blank');
        });
    });

    document.getElementById("instagramLink").addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем переход по умолчанию

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const appLink = "instagram://user?username=natalya_botyanovska_psy";

        if (isMobile) {
            // Пробуем открыть приложение Instagram
            window.location.href = appLink; // Пытаемся открыть приложение Instagram
        } else {
            alert("Откройте Instagram на мобильном устройстве.");
        }
    });
});