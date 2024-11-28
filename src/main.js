// Импорты Swiper и модулей
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

// CSS стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';

// Регистрация модулей Swiper
Swiper.use([Autoplay, Pagination]);

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
        const aboutMeSection = document.querySelector('.image-container-about-me');
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
        // Обновление для basis-head
        if (basisHead && basisSection) {
            const sectionTop = basisSection.offsetTop;
            const rotation = (scrollY - sectionTop) * 0.05;
    
            if (mediaQuery.matches) {
                basisHead.style.transform = `rotate(${rotation}deg)`;
                basisHead.style.margin = "0 auto";
                basisHead.style.left = "";
                basisHead.style.position = "";
            } else {
                basisHead.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
                basisHead.style.left = "50%";
                basisHead.style.position = "relative";
                basisHead.style.margin = "";
            }
        }
    
        // Обновление для about-me-head
        if (aboutMeHead && aboutMeSection) {
            const sectionTop = aboutMeSection.offsetTop;
            const rotation = (scrollY - sectionTop) * 0.05;
    
            if (mediaQuery.matches) {
                aboutMeHead.style.transform = `rotate(${rotation}deg)`;
                aboutMeHead.style.margin = "0 auto";
                aboutMeHead.style.left = "";
                aboutMeHead.style.position = "";
            } else {
                aboutMeHead.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
                aboutMeHead.style.left = "50%";
                aboutMeHead.style.position = "relative";
                aboutMeHead.style.margin = "";
            }
        }
    }
    // Массив с сертификатами (с поддержкой srcset для ретины)
    const certificates = [
      { src: '/images/Certificate1.jpg', src2x: '/images/Certificate1-2x.jpg', alt: 'Certificate 1' },
      { src: '/images/Certificate2.jpg', src2x: '/images/Certificate2-2x.jpg', alt: 'Certificate 2' },
      { src: '/images/Certificate3.jpg', src2x: '/images/Certificate3-2x.jpg', alt: 'Certificate 3' },
      { src: '/images/Certificate4.jpg', src2x: '/images/Certificate4-2x.jpg', alt: 'Certificate 4' },
      { src: '/images/Certificate5.jpg', src2x: '/images/Certificate5-2x.jpg', alt: 'Certificate 5' },
      { src: '/images/Certificate6.jpg', src2x: '/images/Certificate6-2x.jpg', alt: 'Certificate 6' },
      { src: '/images/Certificate7.jpg', src2x: '/images/Certificate7-2x.jpg', alt: 'Certificate 7' },
      { src: '/images/Certificate8.jpg', src2x: '/images/Certificate8-2x.jpg', alt: 'Certificate 8' },
      { src: '/images/Certificate9.jpg', src2x: '/images/Certificate9-2x.jpg', alt: 'Certificate 9' }
    ];
    
const swiperWrapper = document.querySelector('.swiper-wrapper');
certificates.forEach((slide) => {
    const slideElement = document.createElement('div');
    slideElement.className = 'swiper-slide';

    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.alt;

    slideElement.appendChild(img);
    swiperWrapper.appendChild(slideElement);
});

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// Модальное окно
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('img');
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG' && event.target.closest('.swiper-slide')) {
        modalImg.src = event.target.src;
        modal.style.display = 'flex';
    }
});

modal.addEventListener('click', () => {
    modal.style.display = 'none';
});


 // Кнопки для перехода на Telegram и Instagram
 document.querySelectorAll('.telegram-btn').forEach(button => {
    button.addEventListener('click', function() {
        window.open('https://t.me/nataliia_botianovska_psy', '_blank');
    });
});

    document.getElementById("instagramLink").addEventListener("click", function(event) {
        event.preventDefault(); // Предотвращаем переход по умолчанию
    
        const appLink = "instagram://user?username=nataliia_botianovska_psy";
        const webLink = "https://www.instagram.com/nataliia_botianovska_psy/";
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
