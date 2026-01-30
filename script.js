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
