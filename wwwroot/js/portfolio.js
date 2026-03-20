// ── Scroll listener for sticky navbar ──
let _scrollDotNet = null;

window.registerScrollListener = (dotNetRef) => {
    _scrollDotNet = dotNetRef;
    const handler = () => {
        const scrolled = window.scrollY > 30;
        _scrollDotNet.invokeMethodAsync('OnScroll', scrolled);
    };
    window.addEventListener('scroll', handler, { passive: true });
    window._scrollHandler = handler;
};

window.removeScrollListener = () => {
    if (window._scrollHandler) {
        window.removeEventListener('scroll', window._scrollHandler);
    }
};

// ── Smooth scroll to section ──
window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// ── Intersection Observer for fade-up animations ──
window.initFadeObserver = () => {
    const elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
};

// ── Theme management ──
window.getTheme = () => {
    return localStorage.getItem('portfolio-theme') || 'dark';
};

window.setTheme = (theme) => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
};

window.initTheme = () => {
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
};
