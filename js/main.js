// メインビジュアルのスライダー（トップページのみ）
const slides = document.querySelectorAll('.main-visual__slide');
const dots = document.querySelectorAll('.main-visual__dot');

if (slides.length) {
    let currentIndex = 0;
    let timer;

    const showSlide = (index) => {
        slides[currentIndex].classList.remove('is-active');
        dots[currentIndex]?.classList.remove('is-active');
        currentIndex = index;
        slides[currentIndex].classList.add('is-active');
        dots[currentIndex]?.classList.add('is-active');
    };

    const startAutoplay = () => {
        timer = setInterval(() => {
            showSlide((currentIndex + 1) % slides.length);
        }, 4000);
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            showSlide(index);
            startAutoplay();
        });
    });

    startAutoplay();
}

// ハンバーガーメニュー（全ページ共通）
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
    const closeMenu = () => {
        menuToggle.classList.remove('is-active');
        mobileNav.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-menu-open');
    };

    const toggleMenu = () => {
        const isOpen = !menuToggle.classList.contains('is-active');
        menuToggle.classList.toggle('is-active', isOpen);
        mobileNav.classList.toggle('is-active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('is-menu-open', isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);
    mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}

// WORKSセクションの横スクロール（スマホ版カスタムスクロールバー）
const worksGrid = document.querySelector('.works__grid');
const worksTrack = document.querySelector('.works__scrollbar');
const worksThumb = document.querySelector('.works__scrollbar-thumb');

if (worksGrid && worksTrack && worksThumb) {
    const updateThumb = () => {
        const maxScroll = worksGrid.scrollWidth - worksGrid.clientWidth;
        const maxThumbX = worksTrack.clientWidth - worksThumb.clientWidth;
        const ratio = maxScroll > 0 ? worksGrid.scrollLeft / maxScroll : 0;
        worksThumb.style.transform = `translateX(${ratio * maxThumbX}px)`;
    };

    worksGrid.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    updateThumb();
}
