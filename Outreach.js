// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dynamic XML content integration
document.addEventListener('DOMContentLoaded', () => {
    fetch('Outreach.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            // Update hero section title from XML
            const xmlTitle = xmlDoc.querySelector('Title').textContent;
            const heroTitle = document.querySelector('.hero h2');
            if (heroTitle) heroTitle.textContent = xmlTitle;

            // Update CTA box titles from XML
            const subtitles = xmlDoc.querySelectorAll('Subtitle1, Subtitle2, Subtitle3');
            document.querySelectorAll('.cta-box h3').forEach((h3, index) => {
                if (subtitles[index]) h3.textContent = subtitles[index].textContent;
            });
        })
        .catch(error => console.error('Error loading XML:', error));
});

// Newsletter form submission
document.querySelector('.subscribe-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (validateEmail(email)) {
        alert('Thank you for subscribing!');
        this.reset();
    } else {
        alert('Please enter a valid email address.');
    }
});

// CTA box hover effects
document.querySelectorAll('.cta-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'scale(1.03)';
        box.style.transition = 'transform 0.3s ease';
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'scale(1)';
    });
});

// Donate button interaction
document.querySelector('.donate-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'Support Us.html'; // Or open modal
});

// Auto-update copyright year
const yearElement = document.querySelector('.copyright');
if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace('2023', new Date().getFullYear());
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}