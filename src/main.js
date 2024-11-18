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
    

    const swiperContainer = document.querySelector('.swiper-container');
    if (swiperContainer) {
        new Swiper(swiperContainer, {
            effect: 'coverflow', // Эффект Coverflow для кругового вращения
            grabCursor: true, // Указатель мыши, как курсор для захвата
            centeredSlides: true, // Центральный слайд всегда в центре
            slidesPerView: 'auto', // Автоматическая ширина слайдов
            loop: true, // Зацикливание слайдов
            autoplay: {
                delay: 3000, // Автопрокрутка слайдов
                disableOnInteraction: false, // Не отключать автопрокрутку при взаимодействии
            },
            coverflowEffect: {
                rotate: 50, // Угол поворота слайдов
                stretch: 0, // Протяженность слайдов
                depth: 100, // Глубина эффекта
                modifier: 1, // Модификатор силы эффекта
                slideShadows: true, // Включение теней
            },
            pagination: {
                el: '.swiper-pagination', // Добавление пагинации
                clickable: true, // Возможность клика на пагинацию
            },
            direction: 'horizontal', // Горизонтальная прокрутка
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
            if (modalImg) {
                modalImg.src = imgSrc;
                modal.style.display = 'flex';  // Показ модального окна
            } else {
                console.warn("Модальное окно или изображение не найдено.");
            }
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
