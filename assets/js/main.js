/* ==========================================================================
   Valentin Samson — Portfolio
   Scripts communs : thème, menu mobile, header, apparitions au scroll,
   grille de projets, formulaire de contact, page projet.
   ========================================================================== */

(() => {
    "use strict";

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ICONS = {
        arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
        arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
        external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'
    };

    const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

    /* ---------- Thème clair / sombre ---------- */
    const themeBtn = document.querySelector(".theme-toggle");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

    const syncThemeLabel = () => {
        if (!themeBtn) return;
        const next = currentTheme() === "dark" ? "clair" : "sombre";
        themeBtn.setAttribute("aria-label", `Passer en mode ${next}`);
    };

    if (themeBtn) {
        syncThemeLabel();
        themeBtn.addEventListener("click", () => {
            const next = currentTheme() === "dark" ? "light" : "dark";
            root.dataset.theme = next;
            try { localStorage.setItem("theme", next); } catch (e) { /* stockage indisponible */ }
            syncThemeLabel();
        });
        systemDark.addEventListener("change", syncThemeLabel);
    }

    /* ---------- Header : ombre au scroll + menu mobile ---------- */
    const header = document.querySelector(".header");
    const menuBtn = document.querySelector(".menu-toggle");

    if (header) {
        const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (header && menuBtn) {
        const setMenu = (open) => {
            header.classList.toggle("is-open", open);
            menuBtn.setAttribute("aria-expanded", String(open));
            menuBtn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
        };
        menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("is-open")));
        header.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && header.classList.contains("is-open")) {
                setMenu(false);
                menuBtn.focus();
            }
        });
        window.matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));
    }

    /* ---------- Année du footer ---------- */
    document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });

    /* ---------- Apparition au scroll ---------- */
    const revealObserver = !reducedMotion && "IntersectionObserver" in window
        ? new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
        : null;

    const observeReveals = (scope = document) => {
        scope.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
            if (revealObserver) revealObserver.observe(el);
            else el.classList.add("is-visible");
        });
    };

    /* ---------- Couverture d'un projet (image ou couverture générée) ---------- */
    const coverMarkup = (p, eager = false) => {
        if (p.cover) {
            const pos = p.coverPos ? ` style="object-position:${esc(p.coverPos)}"` : "";
            return `<img src="${esc(p.cover)}" alt="${esc(p.coverAlt || p.cardTitle)}"${pos} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
        }
        return `<div class="cover-placeholder" style="--hue:${p.hue ?? 225}" aria-hidden="true">
                    <span class="cover-placeholder__tag">${esc(p.categoryLabel)} · ${esc(p.year)}</span>
                    <span class="cover-placeholder__title">${esc(p.cardTitle)}</span>
                </div>`;
    };

    /* ---------- Grille de projets (accueil) ---------- */
    const grid = document.getElementById("projects-grid");

    if (grid && typeof PROJECTS !== "undefined") {
        const cards = PROJECTS.map((p) => `
            <a class="project-card reveal${p.featured ? " is-featured" : ""}" href="projet.html?id=${encodeURIComponent(p.id)}" data-category="${esc(p.category)}">
                <div class="project-card__media">${coverMarkup(p)}</div>
                <div class="project-card__body">
                    <div class="project-card__meta"><span>${esc(p.categoryLabel)}</span><span>${esc(p.year)}</span></div>
                    <h3 class="project-card__title">${esc(p.cardTitle)}</h3>
                    <p class="project-card__desc">${esc(p.summary)}</p>
                    <span class="project-card__more">Voir le projet ${ICONS.arrowRight}</span>
                </div>
            </a>`).join("");

        const ctaCard = `
            <div class="project-card project-card--cta reveal" data-category="all">
                <div class="project-card__body">
                    <span class="eyebrow">Prochain projet</span>
                    <h3 class="project-card__title">Un événement, une marque ou une boutique à faire rayonner&nbsp;?</h3>
                    <p class="project-card__desc">Je suis ouvert aux collaborations en social media, création de contenu et e-commerce.</p>
                    <a class="btn btn--primary" href="#contact">Parlons-en ${ICONS.arrowRight.replace("<svg", '<svg class="arrow"')}</a>
                </div>
            </div>`;

        grid.innerHTML = cards + ctaCard;
        observeReveals(grid);

        const filters = document.querySelectorAll(".filter");
        filters.forEach((btn) => {
            btn.addEventListener("click", () => {
                const filter = btn.dataset.filter;
                filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
                grid.querySelectorAll(".project-card").forEach((card) => {
                    const cat = card.dataset.category;
                    const show = cat === "all" ? filter === "all" : (filter === "all" || cat === filter);
                    card.hidden = !show;
                    if (show) card.classList.add("is-visible");
                });
            });
        });
    }

    /* ---------- Formulaire de contact (ouvre la messagerie) ---------- */
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const name = `${data.get("firstname")} ${data.get("lastname")}`.trim();
            const subject = `Contact portfolio — ${name}`;
            const body = `${data.get("message")}\n\n${name}\n${data.get("email")}`;
            window.location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            const note = form.querySelector(".form__note");
            if (note) note.textContent = "Votre messagerie s'ouvre avec le message pré-rempli. Il ne reste qu'à l'envoyer !";
        });
    }

    /* ---------- Page projet ---------- */
    const projectRoot = document.getElementById("project-root");

    if (projectRoot && typeof PROJECTS !== "undefined") {
        const id = new URLSearchParams(window.location.search).get("id");
        const index = PROJECTS.findIndex((p) => p.id === id);

        if (index === -1) {
            window.location.replace("index.html#projets");
            return;
        }

        const p = PROJECTS[index];
        const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
        const next = PROJECTS[(index + 1) % PROJECTS.length];

        document.title = `${p.cardTitle} — Valentin Samson`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", p.tagline);

        const hasChapters = Array.isArray(p.chapters) && p.chapters.length > 0;
        const showCover = p.showCover || !hasChapters;

        const chapterText = (c, i) => `
            <span class="chapter__num">${String(i + 1).padStart(2, "0")}</span>
            <h2>${esc(c.title)}</h2>
            <p class="chapter__text">${c.html}</p>`;

        const chapterMarkup = (c, i) => {
            if (c.video) {
                return `
                    <article class="chapter chapter--gallery">
                        <div class="chapter__head reveal">${chapterText(c, i)}</div>
                        <figure class="video reveal${c.vertical ? " video--vertical" : ""}">
                            <video src="${esc(c.video)}" poster="${esc(c.poster || "")}" controls muted loop playsinline preload="none" aria-label="${esc(c.alt || c.title)}"></video>
                        </figure>
                    </article>`;
            }
            if (Array.isArray(c.images)) {
                const cols = Math.min(c.images.length === 4 && !c.poster ? 4 : 3, c.images.length);
                return `
                    <article class="chapter chapter--gallery">
                        <div class="chapter__head reveal">${chapterText(c, i)}</div>
                        <div class="gallery${c.poster ? " gallery--poster" : ""} reveal" style="--cols:${cols}">
                            ${c.images.map((img) => `
                                <figure class="gallery__item"><img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" decoding="async"></figure>`).join("")}
                        </div>
                    </article>`;
            }
            return `
                <article class="chapter${i % 2 ? " chapter--reverse" : ""}">
                    <figure class="chapter__media reveal${c.poster ? " is-poster" : ""}" style="margin:0">
                        <img src="${esc(c.image)}" alt="${esc(c.alt || c.title)}" loading="lazy" decoding="async">
                    </figure>
                    <div class="reveal">${chapterText(c, i)}</div>
                </article>`;
        };

        const chapters = hasChapters ? `
            <section class="section" aria-label="Détails du projet">
                <div class="container chapters">
                    ${p.chapters.map(chapterMarkup).join("")}
                </div>
            </section>` : "";

        const stats = Array.isArray(p.stats) && p.stats.length ? `
            <div class="stats reveal" style="margin-top:48px">
                ${p.stats.map((s, i) => `
                    <div class="stat${i === 0 ? " stat--accent" : ""}"><span class="stat__value">${esc(s.value)}</span><span class="stat__label">${esc(s.label)}</span></div>`).join("")}
            </div>` : "";

        const role = Array.isArray(p.role) && p.role.length ? `
            <div class="role reveal">
                <h2 class="role__title">Ce que j'ai fait</h2>
                <ul class="role__list">${p.role.map((r) => `<li>${r}</li>`).join("")}</ul>
            </div>` : "";

        const outcome = p.outcome ? `
            <section class="section section--tight">
                <div class="container">
                    <div class="outcome reveal">
                        <span class="eyebrow">Ce que j'en retiens</span>
                        <p>${p.outcome}</p>
                    </div>
                </div>
            </section>` : "";

        const credits = p.credits ? `<p class="source-note" style="margin-top:0">${esc(p.credits)}</p>` : "";

        const links = (p.links || []).map((l) => `
            <a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ${ICONS.external}</a>`).join("");

        projectRoot.innerHTML = `
            <section class="page-hero project-header">
                <div class="container">
                    <a class="breadcrumb" href="index.html#projets">${ICONS.arrowLeft} Tous les projets</a>
                    <h1>${esc(p.title)}</h1>
                    <p class="lead">${esc(p.tagline)}</p>
                    <dl class="project-facts">
                        <div><dt>Catégorie</dt><dd>${esc(p.categoryLabel)}</dd></div>
                        <div><dt>Année</dt><dd>${esc(p.year)}</dd></div>
                        <div><dt>Outils & expertises</dt><dd class="chips">${p.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</dd></div>
                    </dl>
                    ${showCover ? `<div class="project-cover">${coverMarkup(p, true)}</div>` : ""}
                </div>
            </section>

            <section class="section section--tight">
                <div class="container">
                    <span class="eyebrow">Le projet</span>
                    <p class="project-intro" style="margin-top:20px">${p.intro}</p>
                    ${stats}
                    ${role}
                    ${links ? `<div class="project-links" style="margin-top:32px">${links}</div>` : ""}
                </div>
            </section>

            ${chapters}

            ${outcome}

            <section class="section section--tight">
                <div class="container">
                    ${credits ? `<div style="margin-bottom:24px">${credits}</div>` : ""}
                    <nav class="project-nav" aria-label="Autres projets">
                        <a href="projet.html?id=${encodeURIComponent(prev.id)}"><small>← Projet précédent</small><strong>${esc(prev.cardTitle)}</strong></a>
                        <a href="projet.html?id=${encodeURIComponent(next.id)}"><small>Projet suivant →</small><strong>${esc(next.cardTitle)}</strong></a>
                    </nav>
                </div>
            </section>`;

        observeReveals(projectRoot);

        /* Visionneuse : clic sur une image du projet pour l'afficher en grand */
        const viewer = document.createElement("dialog");
        viewer.className = "viewer";
        viewer.setAttribute("aria-label", "Image en grand");
        viewer.innerHTML = `<img alt=""><button class="icon-btn viewer__close" type="button" aria-label="Fermer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
        document.body.appendChild(viewer);
        const viewerImg = viewer.querySelector("img");
        projectRoot.addEventListener("click", (e) => {
            const img = e.target.closest(".gallery__item img, .chapter__media img, .project-cover img");
            if (!img || typeof viewer.showModal !== "function") return;
            viewerImg.src = img.currentSrc || img.src;
            viewerImg.alt = img.alt;
            viewer.showModal();
        });
        viewer.addEventListener("click", () => viewer.close());
    }

    observeReveals();
})();
