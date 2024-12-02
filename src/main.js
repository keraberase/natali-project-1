
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


Swiper.use([Autoplay, Pagination]);

document.addEventListener('DOMContentLoaded', () => {

    const mobileMenu = document.querySelector('.mob-menu-list'); 
    const menuOpenButton = document.querySelector('.menu-open-button'); 

    menuOpenButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open'); 
        menuOpenButton.classList.toggle('active');
    });
    const menuLinks = document.querySelectorAll('.mob-menu-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); 

            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId); 

            if (targetElement) {

                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }


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

    // Массив с сертификатами
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

// Создание слайдов
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

// Инициализация Swiper
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

// Обработчик для открытия модального окна
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('img');

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG' && event.target.closest('.swiper-slide')) {
        modalImg.src = event.target.src;
        modal.style.display = 'flex';
    }
});

// Закрытие модального окна при клике
modal.addEventListener('click', () => {
    modal.style.display = 'none';
});




 document.querySelectorAll('.telegram-btn').forEach(button => {
    button.addEventListener('click', function() {
        window.open('https://t.me/nataliia_botianovska_psy', '_blank');
    });
});

    document.getElementById("instagramLink").addEventListener("click", function(event) {
        event.preventDefault();
    
        const appLink = "instagram://user?username=nataliia_botianovska_psy";
        const webLink = "https://www.instagram.com/nataliia_botianovska_psy/";
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    
        if (isMobile) {

            window.location.href = appLink;

            setTimeout(() => {
                window.open(webLink, '_blank'); 
            }, 1000); 
        } else {

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
