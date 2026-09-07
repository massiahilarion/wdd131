window.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const modifiedSpan = document.getElementById('last-modified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }

    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen
                ? '<span class="menu-icon">✕</span>' 
                : '<span class="menu-icon">☰</span>';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<span class="menu-icon">☰</span>';
                }
            });
        });
    }
});
