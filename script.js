// Met l'année courante dans le footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Scroll doux (optionnel)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth",
        });
    });
});
// Dark Mode
const themeBtns = document.querySelectorAll('.theme-btn');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

// Fonction pour activer le thème
const setTheme = (isDark) => {
    if (isDark) {
        body.classList.add('dark-mode');
        themeBtns[0].classList.remove('active'); // Bouton Soleil
        themeBtns[1].classList.add('active'); // Bouton Lune
    } else {
        body.classList.remove('dark-mode');
        themeBtns[0].classList.add('active');
        themeBtns[1].classList.remove('active');
    }
};

// Initialisation au chargement
if (savedTheme === 'dark') {
    setTheme(true);
}

// Event Listeners
themeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const isDark = index === 1; // 1 = Lune = Dark
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});

// --- NEW FEATURES ---

// 2. Scroll Progress & Header Change
const scrollProgressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    if (scrollProgressBar) {
        scrollProgressBar.style.width = progress + '%';
    }

    // Shadow on scroll
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. Reveal Phone Number
const revealBtn = document.getElementById('reveal-phone');
const phoneText = document.querySelector('.phone-text');
const phoneNumber = "07 69 51 71 40"; 

if (revealBtn && phoneText) {
    revealBtn.addEventListener('click', () => {
        phoneText.textContent = phoneNumber;
        revealBtn.classList.add('revealed');
        // Optionnel : Copier dans le presse-papier
        navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
    });
}

// 5. Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 400);
            }
        });
    });
});

// 6. 3D Skills Carousel Logic - Continuous Flow
const carousel = document.getElementById('skillCarousel');
const cards = document.querySelectorAll('.carousel-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const scene = document.querySelector('.carousel-3d-scene');

let currentRotation = 0;
let rotationSpeed = 0.3; // Just a bit slower
const cardCount = cards.length;
const angleStep = 360 / cardCount;
let radius = window.innerWidth < 480 ? 220 : window.innerWidth < 768 ? 280 : 350;

function setupCarousel() {
    // Re-calculate radius on setup/resize
    radius = window.innerWidth < 480 ? 220 : window.innerWidth < 768 ? 280 : 350;
    
    cards.forEach((card, i) => {
        const angle = i * angleStep;
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
}

// Update on resize
window.addEventListener('resize', () => {
    setupCarousel();
    updateCarousel();
});

function animate() {
    currentRotation -= rotationSpeed;
    updateCarousel();
    requestAnimationFrame(animate);
}

function updateCarousel() {
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    
    // Highlight effect based on proximity to center (0 degrees relative)
    cards.forEach((card, i) => {
        let cardAngle = (i * angleStep + currentRotation) % 360;
        if (cardAngle < 0) cardAngle += 360;
        
        const normalizedAngle = ((cardAngle + 180) % 360) - 180;
        const dist = Math.abs(normalizedAngle);
        
        // Continuous, smooth transition for opacity and blur
        // dist is 0 at center, up to 180 at the back
        const opacity = Math.max(0.6, 1 - (dist / 200));
        const blur = Math.min(1.5, dist / 60);
        const scale = Math.max(0.85, 1 - (dist / 500));
        
        card.style.opacity = opacity;
        card.style.filter = `blur(${blur}px)`;
        card.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px) scale(${scale})`;
        
        // Dynamic Z-Index to keep front cards on top
        card.style.zIndex = Math.round(100 - dist);
    });
}

if (carousel && cards.length > 0) {
    setupCarousel();
    requestAnimationFrame(animate);

    // Navigation buttons still work by jumping rotation
    prevBtn.addEventListener('click', () => {
        currentRotation += angleStep;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentRotation -= angleStep;
        updateCarousel();
    });

    // Slow down on hover - very subtle movement
    scene.addEventListener('mouseenter', () => rotationSpeed = 0.05);
    scene.addEventListener('mouseleave', () => rotationSpeed = 0.3);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') currentRotation += angleStep;
        if (e.key === 'ArrowRight') currentRotation -= angleStep;
        updateCarousel();
    });
}

// 4. Entrance Animations (Reveal on Scroll) - UPDATED
const revealElements = document.querySelectorAll('.section, .project-card, .skill-card');
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// 7. Typewriter Effect
const taglineElement = document.getElementById('tagline');
const roles = ["Designer Graphique", "Développeur Web", "Étudiant MMI", "Créateur de Contenu"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        taglineElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        taglineElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (taglineElement) type();
});



