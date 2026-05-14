/* Docs page interactions */
document.addEventListener('DOMContentLoaded', () => {
    initSidebarNav();
    initScrollSpy();
});

function initSidebarNav() {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            links.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('.docs-section');
    const links = document.querySelectorAll('.sidebar-link');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    links.forEach((l) => l.classList.remove('active'));
                    const activeLink = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '-80px 0px -60% 0px',
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function copyCode(btn) {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock.querySelector('code');
    if (!code) return;

    navigator.clipboard.writeText(code.textContent).then(() => {
        const original = btn.textContent;
        btn.textContent = '已复制';
        btn.style.color = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    });
}