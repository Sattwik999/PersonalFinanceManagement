// Particle animation
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const x = Math.random() * window.innerWidth;
    particle.style.left = `${x}px`;
    
    const hue = Math.random() * 360;
    particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    
    const animationDuration = Math.random() * 2 + 3;
    particle.style.animation = `float-up ${animationDuration}s linear`;
    
    document.querySelector('.particles-container').appendChild(particle);
    
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

setInterval(createParticle, 50);

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const fadeElems = document.querySelectorAll('.fade-in-section');

const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
});

// Typewriter effect for hero section
const heroText = document.querySelector('.hero-text');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});

// Form submission handling
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    console.log('Form submitted');
    
    // Clear form fields
    contactForm.reset();
    
    // Show a success message
    alert('Thank you for your message. We will get back to you soon!');
});