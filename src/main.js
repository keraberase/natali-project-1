import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

Swiper.use([Autoplay, Pagination]);

(function() {
    'use strict';
    
    // Block suspicious URL parameters
    const currentUrl = window.location.href.toLowerCase();
    const suspiciousPatterns = [
        /<script/i, /<\/script/i, /javascript:/i, 
        /onclick=/i, /onload=/i, /onerror=/i,
        /eval\(/i, /document\.cookie/i, /\.\.\//i,
        /union.*select/i, /from.*information_schema/i
    ];
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(currentUrl)) {
            console.warn('Blocked suspicious URL pattern:', pattern);
            window.history.replaceState(null, '', window.location.pathname);
            return;
        }
    }
    
    // Validate all external links on page load
    document.addEventListener('DOMContentLoaded', function() {
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && /javascript:|data:|vbscript:/i.test(href)) {
                console.warn('Removed dangerous link:', href);
                link.removeAttribute('href');
            }
        });
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile menu visibility
    const mobileMenu = document.querySelector('.mob-menu-list');
    const menuOpenButton = document.querySelector('.menu-open-button');

    menuOpenButton?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('open');
        menuOpenButton.classList.toggle('active');
    });


    function customSmoothScrollTo(targetPos) {
        const duration = 1200; 
        const startPos = window.pageYOffset;
        const distance = targetPos - startPos;
        let startTime = null;

        function animateScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            

            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPos + (distance * ease));
            
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }


    document.addEventListener('click', event => {
        const mobileLink = event.target.closest('.mob-menu-link');
        const desktopLink = event.target.closest('.header-menu-link');
        
        const link = mobileLink || desktopLink;
        if (!link) return;
        
        event.preventDefault();

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const headerOffset = 0; 
            const offsetPosition = targetPosition - headerOffset;

            customSmoothScrollTo(offsetPosition);


            if (mobileLink) {
                mobileMenu?.classList.remove('open');
                menuOpenButton?.classList.remove('active');
            }


            if (window.location.pathname === '/' || window.location.pathname === '') {
                history.replaceState(null, '', targetId);
            }
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
    loopAdditionalSlides: 3,
    loopedSlides: 5,
    coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 350,
        modifier: 1,
        slideShadows: true,
    },
    // ПРОСТОЙ обработчик клика
    on: {
        click(event) {
            // Без дополнительной логики
        },
    },
    autoplay: { 
        delay: 3000, 
        disableOnInteraction: false 
    },
});

    // Modal image viewer
    const modal = document.querySelector('.modal');
    const modalImg = modal?.querySelector('img');

    if (modal) {
    modal.style.display = 'none';
}
if (modalImg) {
    modalImg.src = '';
    modalImg.style.display = 'none';
}


    document.addEventListener('click', event => {
        const image = event.target.closest('.swiper-slide img');
        if (!image || !modalImg || !modal) return;

          if (image.src && image.src !== window.location.href) {
        modalImg.src = image.src;
        modalImg.style.display = 'block';
        modal.style.display = 'flex';
    }
    });

    modal?.addEventListener('click', event => {

 if (event.target === modal || event.target === modalImg) {
        modal.style.display = 'none';
        modalImg.style.display = 'none';
        modalImg.src = ''; // Очищаем src при закрытии
    }
        
    });

    document.addEventListener('DOMContentLoaded', () => {
    if (modal) {
        modal.style.display = 'none';
    }
    if (modalImg) {
        modalImg.style.display = 'none';
        modalImg.src = '';
    }
});

    // Secure external links
   function openSecureLink(url) {
    const allowedDomains = [
        't.me', 
        'instagram.com', 
        'www.instagram.com',
        'cdn.jsdelivr.net',
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdnjs.cloudflare.com'
    ];
    
    try {
        const link = new URL(url);
        
        // Enhanced domain validation
        const isAllowedDomain = allowedDomains.some(domain => 
            link.hostname === domain || link.hostname.endsWith('.' + domain)
        );
        
        if (!isAllowedDomain) {
            console.error('Blocked unsafe domain:', link.hostname);
            return false;
        }
        
        // Block suspicious protocols and patterns
        const dangerousPatterns = [
            'javascript:', 'data:', 'vbscript:', 
            '<script', 'onclick=', 'onload='
        ];
        
        if (dangerousPatterns.some(pattern => 
            link.href.toLowerCase().includes(pattern))) {
            console.error('Blocked malicious URL:', url);
            return false;
        }
        
        window.open(url, '_blank', 'noopener,noreferrer');
        return true;
        
    } catch (error) {
        console.error('Invalid URL:', url, error);
        return false;
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

        const webLink = 'https://www.instagram.com/natalia_botianovska_psy/';
        const appLink = 'instagram://user?username=natalia_botianovska_psy';
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

        if (isMobile) {
            window.location.href = appLink;
            setTimeout(() => {
                window.open(webLink, '_blank', 'noopener,noreferrer');
            }, 1000);
        } else {
            window.open(webLink, '_blank', 'noopener,noreferrer');
        }
    });

    // Smooth scroll to top with custom speed
    const arrowUp = document.querySelector('.arrow-up');
    arrowUp?.addEventListener('click', event => {
        event.preventDefault();
        customSmoothScrollTo(0); // Прокрутка к верху с кастомной скоростью
    });
});