

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

    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');

    document.querySelectorAll('.certificate-image').forEach((image, index) => {
        image.addEventListener('click', () => {
            const highResSrc = image.getAttribute('data-full');
            openModal(highResSrc, index);
        });
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    function openModal(imgSrc, index) {
        const tempImage = new Image();
        tempImage.onload = () => {
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
        };
        tempImage.onerror = () => {
            console.error('Изображение не найдено по пути:', imgSrc);
            alert('Изображение не найдено. Проверьте, что файл загружен на сервер.');
        };
        tempImage.src = imgSrc;
    }
});


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
        // Пробуем открыть приложение Instagram
        const appOpened = window.location.href = appLink; // Пытаемся открыть приложение Instagram


    } else {
        alert("Откройте Instagram на мобильном устройстве.");
    }
});