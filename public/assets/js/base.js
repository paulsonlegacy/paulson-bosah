// Initialize Lucide Icons
lucide.createIcons();

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});