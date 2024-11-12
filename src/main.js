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

    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                updateHeadRotation();
                isScrolling = false;
            });
        }
    });

    function updateHeadRotation() {
        const scrollY = window.scrollY;
        const basisSection = document.querySelector('.basis');
        if (basisHead && basisSection) {
            const sectionTop = basisSection.offsetTop;
            // Изменяем коэффициент вращения для более естественного эффекта
            const rotation = (scrollY - sectionTop) * 0.05; // Уменьшаем коэффициент до 0.05
            basisHead.style.transform = `translate(-50%, 0) rotate(${rotation}deg)`;
        }

        const aboutMeSection = document.querySelector('.image-container-about-me');
        if (aboutMeHead && aboutMeSection) {
            const sectionTop = aboutMeSection.offsetTop;
            const rotation = (scrollY - sectionTop) * 0.05; // Тоже здесь
            aboutMeHead.style.transform = `translate(-50%, 0) rotate(${rotation}deg)`;
        }
    }


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
    // Добавляем событие клика на каждое изображение сертификата
    document.querySelectorAll('.certificate-image').forEach((image) => {
        image.addEventListener('click', () => {
            openModal(image.src); // Передаем URL изображения в функцию открытия модального окна
        });
    });

    // Функция для открытия модального окна
    function openModal(imgSrc) {
        if (imgSrc) {
            modalImg.src = imgSrc; // Устанавливаем путь к изображению
            modal.style.display = 'flex'; // Показываем модальное окно
        } else {
            console.warn("Ошибка: Путь к изображению пустой."); // Сообщение об ошибке в консоли
        }
    }

    // Закрытие модального окна при клике на него
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImg.src = ""; // Очистка src после закрытия модального окна
    });

    // Закрытие модального окна при нажатии клавиши Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            modalImg.src = ""; // Очистка src при закрытии
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
    
        const appLink = "instagram://user?username=natalya_botyanovska_psy";
        const webLink = "https://www.instagram.com/natalya_botyanovska_psy/";
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    
        if (isMobile) {
            // Попытка открыть приложение Instagram
            window.location.href = appLink;
    
            // Таймер для перехода на веб-версию, если приложение не установлено
            setTimeout(() => {
                window.open(webLink, '_blank'); // Открываем веб-версию в новой вкладке
            }, 1000); // Пауза 1000 мс перед переходом на веб-версию
        } else {
            // На ПК сразу открывается веб-версия в новой вкладке
            window.open(webLink, '_blank');
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
