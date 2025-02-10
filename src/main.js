import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

Swiper.use([Autoplay, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile menu visibility
    const mobileMenu = document.querySelector('.mob-menu-list');
    const menuOpenButton = document.querySelector('.menu-open-button');

    menuOpenButton?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('open');
        menuOpenButton.classList.toggle('active');
    });

    // Smooth scroll to sections when clicking menu links
    document.addEventListener('click', event => {
        const link = event.target.closest('.mob-menu-link');
        if (!link) return;
        event.preventDefault();

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            });
            mobileMenu?.classList.remove('open');
            menuOpenButton?.classList.remove('active');
        }
    });

    // Rotate head on scroll
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
        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        function applyRotation(head, section) {
            if (!head || !section) return;
            const rotation = (scrollY - section.offsetTop) * 0.05;

            head.style.transform = `rotate(${rotation}deg)`;
            if (mediaQuery.matches) {
                head.style.margin = '0 auto';
                head.style.left = '';
                head.style.position = '';
            } else {
                head.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
                head.style.left = '50%';
                head.style.position = 'relative';
            }
        }

        applyRotation(basisHead, document.querySelector('.basis'));
        applyRotation(
            aboutMeHead,
            document.querySelector('.image-container-about-me')
        );
    }

    // Initialize Swiper slider
    const swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        initialSlide: 2,
        speed: 600,
        preventClicks: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 350,
            modifier: 1,
            slideShadows: true,
        },
        on: {
            click(event) {
                swiper.slideTo(this.clickedIndex);
            },
        },
        autoplay: { delay: 3000, disableOnInteraction: false },
    });

    // Modal image viewer
    const modal = document.querySelector('.modal');
    const modalImg = modal?.querySelector('img');

    document.addEventListener('click', event => {
        const image = event.target.closest('.swiper-slide img');
        if (!image || !modalImg || !modal) return;

        modalImg.src = image.src;
        modal.style.display = 'flex';
    });

    modal?.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Secure external links
    function openSecureLink(url) {
        const allowedDomains = ['t.me', 'instagram.com'];
        try {
            const link = new URL(url);
            if (allowedDomains.includes(link.hostname)) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                console.error('Blocked potentially unsafe link:', url);
            }
        } catch (error) {
            console.error('Invalid URL:', url);
        }
    }

    document.addEventListener('click', event => {
        const button = event.target.closest('.telegram-btn');
        if (button) {
            openSecureLink('https://t.me/nataliia_botianovska_psy');
        }
    });

    // Handle Instagram link for mobile and desktop users
   const instagramButton = document.getElementById('instagramLink');
instagramButton?.addEventListener('click', event => {
    event.preventDefault();

    const webLink = 'https://www.instagram.com/nataliia_botianovska_psy/';
    const appLink = 'instagram://user?username=nataliia_botianovska_psy';
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = appLink;
        setTimeout(() => {
            window.open(webLink, '_blank', 'noopener,noreferrer');
        }, 1000);
    } else {
        window.open(webLink, '_blank', 'noopener,noreferrer'); // На ПК сразу открываем веб-версию
    }
});


    // Smooth scroll to top
    const arrowUp = document.querySelector('.arrow-up');
    arrowUp?.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Secure history.replaceState
    document.addEventListener('click', event => {
        const link = event.target.closest('.header-menu-link');
        if (!link) return;
        event.preventDefault();

        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
            });
            if (window.location.pathname === '/') {
                history.replaceState(null, '', window.location.pathname);
            }
        }
    });
});
