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

// 6. Skills Carousel & Cards
const skillCards = document.querySelectorAll('.skill-card');
const tracks = document.querySelectorAll('.skills-track, .soft-skills-track');

// Handle Flip Logic
skillCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent flipping if clicking a link
        if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
            return;
        }
        card.classList.toggle('flipped');
    });

    // Handle "Retour" button specifically
    const backBtn = card.querySelector('.btn-flip-back');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('flipped');
        });
    }
});

// Slow down animation on hover (instead of pausing)
tracks.forEach(track => {
    const normalDuration = track.classList.contains('soft-skills-track') ? '35s' : '30s';
    const slowDuration = track.classList.contains('soft-skills-track') ? '120s' : '100s';
    track.addEventListener('mouseenter', () => {
        track.style.animationDuration = slowDuration;
    });
    track.addEventListener('mouseleave', () => {
        track.style.animationDuration = normalDuration;
    });
});

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


// 8. Split Personality Parallax Effect
const splitSides = document.querySelectorAll('.split-side');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    splitSides.forEach((side, index) => {
        const image = side.querySelector('.split-image img');
        if (!image) return;
        
        // Only run if the section is somewhat in view
        const rect = side.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Calculate relative scroll within the section
            const move = (window.innerHeight - rect.top) * 0.05;
            // index 0 is left (Creative), index 1 is right (Athlete)
            // Reverse movement for the right side for a "clashing" effect if desired, 
            // or just kept it consistent for a "floating" feel.
            image.style.transform = `translateY(${-move}px) scale(${1 + move * 0.0001})`;
        }
    });
});
