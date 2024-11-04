import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', () => {

    const mobileMenu = document.querySelector('.mob-menu-list'); // Мобильное меню
    const menuOpenButton = document.querySelector('.menu-open-button'); // Кнопка открытия меню

    menuOpenButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open'); // Переключаем класс для открытия/закрытия меню
        menuOpenButton.classList.toggle('active'); // Переключаем класс для кнопки
    });
    const menuLinks = document.querySelectorAll('.mob-menu-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Отменяем стандартное поведение ссылки

            const targetId = this.getAttribute('href'); // Получаем id цели
            const targetElement = document.querySelector(targetId); // Находим целевой элемент

            if (targetElement) {
                // Прокручиваем к целевому элементу
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }

            // Закрываем мобильное меню
            mobileMenu.classList.remove('open');
            menuOpenButton.classList.remove('active');
        });
    });

    const basisHead = document.querySelector('.basis-head');
    const aboutMeHead = document.querySelector('.about-me-head');

    window.addEventListener('scroll', () => {
        // Обработка вращения для .basis-head
        const basisSection = document.querySelector('.basis');
        if (basisHead && basisSection) {
            const { top, bottom, height } = basisSection.getBoundingClientRect();
            const isVisible = top < window.innerHeight && bottom > 0;

            // Новый расчет вращения
            const rotateAmount = isVisible ? (window.scrollY - top + height) * 0.1 : 0;
            basisHead.style.transform = `translate(-50%, 0) rotate(${rotateAmount}deg)`;
        }

        // Обработка вращения для .about-me-head
        const aboutMeSection = document.querySelector('.image-container-about-me');
        if (aboutMeHead && aboutMeSection) {
            const { top, bottom, height } = aboutMeSection.getBoundingClientRect();
            const isVisible = top < window.innerHeight && bottom > 0;

            // Новый расчет вращения
            const rotateAmount = isVisible ? (window.scrollY - top + height) * 0.1 : 0;
            aboutMeHead.style.transform = `translate(-50%, 0) rotate(${rotateAmount}deg)`;
        }
    });

    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
        new Swiper(swiperContainer, {
            slidesPerView: 1.5, // Показываем один полный слайд и часть двух соседних
            centeredSlides: true, // Центрируем активный слайд
            spaceBetween: 20, // Устанавливаем отступы между слайдами
            loop: true, // Зацикливание
            autoplay: { // Автопрокрутка
                delay: 5000,
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

    const arrowUp = document.querySelector('.arrow-up');

    // Обработчик события для прокрутки вверх
    arrowUp.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение ссылки

        window.scrollTo({
            top: 0, // Позиция сверху
            behavior: 'smooth' // Плавная прокрутка
        });
    });
});
