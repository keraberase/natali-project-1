// Импортируем Swiper и его стили
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

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

    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
        new Swiper(swiperContainer, {
            slidesPerView: 1.3, // Показывать один слайд полностью и частично два соседних
            centeredSlides: true, // Центрирование активного слайда
            spaceBetween: 20, // Отступы между слайдами
            loop: true, // Зацикливание
            autoplay: { // Автопрокрутка
                delay: 3000,
                disableOnInteraction: false, // Продолжить автопрокрутку после взаимодействия
            },
        });
    }

    // Логика для модального окна
    const modal = document.querySelector('.modal');
    const modalImg = modal ? modal.querySelector('img') : null;

    if (modal && modalImg) {
        document.querySelectorAll('.certificate-image').forEach((image) => {
            image.addEventListener('click', () => {
                openModal(image.src);
            });
        });

        function openModal(imgSrc) {
            modalImg.src = imgSrc;
            modal.style.display = 'flex'; // Изменяем стиль на 'flex', чтобы показать модальное окно
        }

        // Закрытие модального окна при клике на него
        modal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Закрытие модального окна при нажатии на клавишу Esc
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    // Кнопки для перехода на Telegram и Instagram
    document.querySelectorAll('.telegram-btn').forEach(button => {
        button.addEventListener('click', function() {
            window.open('https://t.me/natalyabotyanovskaya', '_blank');
        });
    });

    document.getElementById("instagramLink").addEventListener("click", function(event) {
        event.preventDefault(); // Предотвращаем переход по умолчанию

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const appLink = "instagram://user?username=natalya_botyanovska_psy";

        if (isMobile) {
            window.location.href = appLink; // Пытаемся открыть приложение Instagram
        } else {
            alert("Откройте Instagram на мобильном устройстве.");
        }
    });
});
