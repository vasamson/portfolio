/* ==========================================================================
   Valentin Samson — Portfolio
   Scripts communs : thème, menu mobile, header, vidéo d'accueil,
   cartes projets, carrousel, formulaire de contact, page projet.
   ========================================================================== */

(() => {
    "use strict";

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svg = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
    const ICONS = {
        arrowRight: svg('<path d="M5 12h14m-6-6 6 6-6 6"/>'),
        arrowLeft: svg('<path d="M19 12H5m6 6-6-6 6-6"/>'),
        external: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
        close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
        volume: svg('<path d="M11 5 6 9H2v6h4l5 4zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>'),
        mute: svg('<path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/>')
    };

    const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

    const roll = (text) => `<span class="roll" data-text="${esc(text)}"><span>${esc(text)}</span></span>`;

    /* ---------- Thème clair / sombre ---------- */
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");
    const themeBtns = document.querySelectorAll("[data-theme-set]");

    const syncTheme = () => {
        const theme = currentTheme();
        themeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.themeSet === theme)));
    };

    themeBtns.forEach((btn) => btn.addEventListener("click", () => {
        root.dataset.theme = btn.dataset.themeSet;
        try { localStorage.setItem("theme", btn.dataset.themeSet); } catch (e) { /* stockage indisponible */ }
        syncTheme();
    }));
    systemDark.addEventListener("change", syncTheme);
    syncTheme();

    /* ---------- Header : fond au scroll + menu mobile ---------- */
    const header = document.querySelector(".header");
    const menuBtn = document.querySelector(".menu-btn");

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
        header.querySelectorAll(".mobile-menu a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && header.classList.contains("is-open")) {
                setMenu(false);
                menuBtn.focus();
            }
        });
        window.matchMedia("(min-width: 1200px)").addEventListener("change", () => setMenu(false));
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

    /* ---------- Vidéo d'accueil : pause, son, curseur personnalisé ---------- */
    const showreel = document.getElementById("showreel");

    if (showreel) {
        const video = showreel.querySelector("video");
        const toggleBtn = showreel.querySelector('[data-video="toggle"]');
        const soundBtn = showreel.querySelector('[data-video="sound"]');
        const soundLabel = soundBtn.querySelector(".sound__label");
        const cursor = document.querySelector(".cursor");
        const cursorLabel = cursor && cursor.querySelector("span");

        if (reducedMotion) video.removeAttribute("autoplay");

        const syncPlay = () => {
            toggleBtn.classList.toggle("is-paused", video.paused);
            toggleBtn.setAttribute("aria-label", video.paused ? "Lire la vidéo" : "Mettre en pause");
        };
        const syncSound = () => {
            const on = !video.muted;
            soundBtn.setAttribute("aria-pressed", String(on));
            soundLabel.textContent = on ? "Couper le son" : "Activer le son";
            if (cursor) {
                cursor.firstElementChild.outerHTML = on ? ICONS.mute : ICONS.volume;
                cursorLabel.textContent = on ? "Couper le son" : "Activer le son";
            }
        };
        const toggleSound = () => {
            video.muted = !video.muted;
            if (video.paused) video.play().catch(() => { });
            syncSound();
        };

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (video.paused) video.play().catch(() => { }); else video.pause();
        });
        soundBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleSound(); });
        video.addEventListener("play", syncPlay);
        video.addEventListener("pause", syncPlay);
        syncPlay();

        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!fine) showreel.classList.add("is-touch");

        if (cursor && fine) {
            showreel.addEventListener("click", (e) => {
                if (!e.target.closest(".hero__controls")) toggleSound();
            });
            showreel.addEventListener("pointermove", (e) => {
                const overControls = !!e.target.closest(".hero__controls");
                cursor.classList.toggle("is-on", !overControls);
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
            showreel.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
        } else {
            showreel.classList.remove("has-cursor");
        }

        /* Met la vidéo en pause hors écran pour économiser la batterie */
        if ("IntersectionObserver" in window) {
            new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting && !video.paused) { video.pause(); video.dataset.autopaused = "1"; }
                else if (entry.isIntersecting && video.dataset.autopaused) { delete video.dataset.autopaused; video.play().catch(() => { }); }
            }, { threshold: 0.15 }).observe(showreel);
        }
        syncSound();
    }

    /* ---------- Mon Tour de France : tracé piloté par le scroll ---------- */
    const tour = document.getElementById("tour");

    if (tour) {
        const segs = [...tour.querySelectorAll(".tour__seg")];
        const pins = [...tour.querySelectorAll(".tour__pin")];
        const stages = [...tour.querySelectorAll(".stage")];
        const bike = tour.querySelector(".tour__bike");
        const kmEl = tour.querySelector(".tour__km");
        const lengths = segs.map((s) => s.getTotalLength());
        const total = lengths.reduce((a, b) => a + b, 0);
        const stageKm = stages.map((s) => Number(s.dataset.km));
        const fmt = new Intl.NumberFormat("fr-FR");
        let hovered = -1;

        segs.forEach((s, i) => {
            s.style.strokeDasharray = `${lengths[i]} ${lengths[i]}`;
            s.style.strokeDashoffset = lengths[i];
        });

        /* p : avancement de 0 à 1 le long du parcours complet */
        const setProgress = (p) => {
            let left = Math.max(0, Math.min(1, p)) * total;
            let seg = 0;
            let local = 0;
            segs.forEach((s, i) => {
                const drawn = Math.max(0, Math.min(lengths[i], left));
                s.style.strokeDashoffset = lengths[i] - drawn;
                if (left > 0 && drawn > 0) { seg = i; local = drawn; }
                left -= lengths[i];
            });

            /* Étape atteinte = fin du dernier segment entièrement tracé */
            const pos = segs.length ? segs[seg].getPointAtLength(local) : null;
            if (pos) bike.setAttribute("transform", `translate(${pos.x} ${pos.y})`);
            const frac = lengths[seg] ? local / lengths[seg] : 0;
            const reached = p <= 0 ? 0 : (frac >= 0.999 ? seg + 1 : seg);
            const kmNow = stageKm[seg] + (stageKm[seg + 1] - stageKm[seg]) * frac;
            kmEl.textContent = fmt.format(Math.round(p <= 0 ? 0 : kmNow / 10) * 10);

            const active = hovered >= 0 ? hovered : reached;
            pins.forEach((pin, i) => {
                pin.classList.toggle("is-reached", i <= reached);
                pin.classList.toggle("is-active", i === active);
            });
            stages.forEach((st, i) => {
                st.classList.toggle("is-reached", i <= reached);
                st.classList.toggle("is-active", i === active);
            });
        };

        let current = 0;
        const render = () => setProgress(current);

        /* Survol d'une étape (liste ou carte) : on la met en évidence */
        const hover = (i) => { hovered = i; pins.forEach((pin, j) => pin.classList.toggle("is-hover", j === i)); render(); };
        [...pins, ...stages].forEach((el) => {
            el.addEventListener("mouseenter", () => hover(Number(el.dataset.stage)));
            el.addEventListener("mouseleave", () => hover(-1));
        });

        /* Plus de section collante : partout, l'animation se joue à l'apparition */
        const sticky = { matches: false, addEventListener() { } };

        if (reducedMotion) {
            current = 1;
            render();
        } else {
            /* Desktop : le scroll fait avancer le vélo. Mobile : animation à l'apparition. */
            const onScroll = () => {
                if (!sticky.matches) return;
                const r = tour.getBoundingClientRect();
                const run = tour.offsetHeight - window.innerHeight;
                current = run > 0 ? Math.max(0, Math.min(1, -r.top / run)) : 1;
                render();
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onScroll);
            onScroll();

            let played = false;
            const play = () => {
                if (played || sticky.matches) return;
                played = true;
                const start = performance.now();
                const step = (now) => {
                    const t = Math.min(1, (now - start) / 4500);
                    current = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                    render();
                    if (t < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            };
            if ("IntersectionObserver" in window) {
                new IntersectionObserver(([entry]) => { if (entry.isIntersecting) play(); }, { threshold: 0.3 })
                    .observe(tour.querySelector(".tour__map"));
            } else {
                current = 1;
                render();
            }
            sticky.addEventListener("change", () => { if (!sticky.matches && !played) { current = 1; render(); } else onScroll(); });
        }
        render();
    }

    /* ---------- Carrousel ---------- */
    document.querySelectorAll(".slider").forEach((slider) => {
        const track = slider.querySelector(".slider__track");
        slider.querySelectorAll("[data-slide]").forEach((b) => b.addEventListener("click", () => {
            const slide = track.querySelector(".slide");
            const step = slide ? slide.getBoundingClientRect().width + 20 : track.clientWidth;
            const dir = Number(b.dataset.slide);
            const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
            const atStart = track.scrollLeft <= 4;
            if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
            else if (dir < 0 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
            else track.scrollBy({ left: dir * step, behavior: "smooth" });
        }));
    });

    /* ---------- FAQ : une seule réponse ouverte à la fois ---------- */
    const faqItems = document.querySelectorAll(".faq__item");
    faqItems.forEach((item) => item.addEventListener("toggle", () => {
        if (item.open) faqItems.forEach((other) => { if (other !== item) other.open = false; });
    }));

    /* ---------- Couverture d'un projet (image ou couverture générée) ---------- */
    const coverMarkup = (p, eager = false) => {
        if (p.cover) {
            const pos = p.coverPos ? ` style="object-position:${esc(p.coverPos)}"` : "";
            return `<img src="${esc(p.cover)}" alt="${esc(p.coverAlt || p.cardTitle)}"${pos} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
        }
        return `<div class="cover-placeholder" aria-hidden="true">
                    <span class="cover-placeholder__tag">${esc(p.categoryLabel)} · ${esc(p.year)}</span>
                    <span class="cover-placeholder__title">${esc(p.cardTitle)}</span>
                </div>`;
    };

    /* Filtres d'un projet : sa catégorie (web et e-commerce regroupés) + « event » */
    const filterKeys = (p) => {
        const keys = [p.category === "ecommerce" ? "web" : p.category];
        if (p.event) keys.push("event");
        return keys.join(" ");
    };

    const cardMarkup = (p) => `
        <a class="card reveal" href="projet.html?id=${encodeURIComponent(p.id)}" data-filters="${esc(filterKeys(p))}">
            <div class="card__media">${coverMarkup(p.cardCover ? { ...p, cover: p.cardCover, coverAlt: p.cardCoverAlt, coverPos: null } : p)}<span class="card__go">Voir le projet ${ICONS.arrowRight}</span></div>
            <div class="card__body">
                <h3 class="card__title">${esc(p.cardTitle)}</h3>
                <p class="card__desc">${esc(p.summary)}</p>
                <div class="card__tags"><span class="pill">${esc(p.categoryLabel)}</span><span class="pill">${esc(p.year)}</span></div>
            </div>
        </a>`;

    if (typeof PROJECTS !== "undefined") {
        /* Accueil : derniers projets */
        const latest = document.getElementById("latest-grid");
        if (latest) {
            latest.innerHTML = PROJECTS.slice(0, Number(latest.dataset.limit) || 4).map(cardMarkup).join("");
            observeReveals(latest);
        }

        /* Page projets : grille complète + filtres */
        const grid = document.getElementById("projects-grid");
        if (grid) {
            grid.innerHTML = PROJECTS.map(cardMarkup).join("");
            observeReveals(grid);

            const filters = document.querySelectorAll(".filter");
            const applyFilter = (filter) => {
                filters.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
                grid.querySelectorAll(".card").forEach((card) => {
                    const show = filter === "all" || card.dataset.filters.split(" ").includes(filter);
                    card.hidden = !show;
                    if (show) card.classList.add("is-visible");
                });
            };
            filters.forEach((btn) => btn.addEventListener("click", () => {
                applyFilter(btn.dataset.filter);
                history.replaceState(null, "", btn.dataset.filter === "all" ? location.pathname : `#${btn.dataset.filter}`);
            }));
            const initial = location.hash.slice(1);
            if (initial && [...filters].some((b) => b.dataset.filter === initial)) applyFilter(initial);
        }
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
            window.location.replace("projets.html");
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
                    <figure class="chapter__media reveal${c.poster ? " is-poster" : ""}">
                        <img src="${esc(c.image)}" alt="${esc(c.alt || c.title)}" loading="lazy" decoding="async">
                    </figure>
                    <div class="reveal">${chapterText(c, i)}</div>
                </article>`;
        };

        const chapters = hasChapters ? `
            <section class="wrap chapters" aria-label="Détails du projet">
                ${p.chapters.map(chapterMarkup).join("")}
            </section>` : "";

        const stats = Array.isArray(p.stats) && p.stats.length ? `
            <div class="stats reveal">
                ${p.stats.map((s, i) => `
                    <div class="stat${i === 0 ? " stat--accent" : ""}"><span class="stat__value">${esc(s.value)}</span><span class="stat__label">${esc(s.label)}</span></div>`).join("")}
            </div>` : "";

        const role = Array.isArray(p.role) && p.role.length ? `
            <div class="role reveal">
                <h2 class="block-title">Ce que j'ai fait</h2>
                <ul>${p.role.map((r) => `<li>${r}</li>`).join("")}</ul>
            </div>` : "";

        const outcome = p.outcome ? `
            <section class="wrap">
                <div class="outcome reveal">
                    <p class="sec-kicker">Ce que j'en retiens</p>
                    <p>${p.outcome}</p>
                </div>
            </section>` : "";

        const credits = p.credits ? `<p class="source-note">${esc(p.credits)}</p>` : "";

        const links = (p.links || []).map((l) => `
            <a class="btn btn--soft has-roll" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${roll(l.label)} ${ICONS.external}</a>`).join("");

        projectRoot.innerHTML = `
            <section class="page-head grid-bg">
                <span class="blob" aria-hidden="true"></span>
                <div class="wrap">
                    <a class="breadcrumb" href="projets.html">${ICONS.arrowLeft} Tous les projets</a>
                    <h1 style="max-width:28ch">${esc(p.title)}</h1>
                    <p class="sec-lead">${esc(p.tagline)}</p>
                    <div class="facts">
                        <span class="pill pill--fill">${esc(p.categoryLabel)}</span>
                        <span class="pill pill--fill">${esc(p.year)}</span>
                        ${p.tools.map((t) => `<span class="pill">${esc(t)}</span>`).join("")}
                    </div>
                </div>
            </section>

            <div class="stack" style="padding-top:8px;padding-bottom:72px">
                ${showCover ? `<div class="wrap"><div class="project-cover">${coverMarkup(p, true)}</div></div>` : ""}

                <section class="wrap" style="display:flex;flex-direction:column;gap:40px">
                    <div>
                        <h2 class="sec-title">Le projet</h2>
                        <p class="project-intro" style="margin-top:12px">${p.intro}</p>
                    </div>
                    ${stats}
                    ${role}
                    ${links ? `<div class="project-links">${links}</div>` : ""}
                </section>

                ${chapters}

                ${outcome}

                <section class="wrap" style="display:flex;flex-direction:column;gap:20px">
                    ${credits}
                    <nav class="project-nav" aria-label="Autres projets">
                        <a href="projet.html?id=${encodeURIComponent(prev.id)}"><small>← Projet précédent</small><strong>${esc(prev.cardTitle)}</strong></a>
                        <a href="projet.html?id=${encodeURIComponent(next.id)}"><small>Projet suivant →</small><strong>${esc(next.cardTitle)}</strong></a>
                    </nav>
                </section>
            </div>`;

        observeReveals(projectRoot);

        /* Visionneuse : clic sur une image du projet pour l'afficher en grand */
        const viewer = document.createElement("dialog");
        viewer.className = "viewer";
        viewer.setAttribute("aria-label", "Image en grand");
        viewer.innerHTML = `<img alt=""><button class="viewer__close" type="button" aria-label="Fermer">${ICONS.close}</button>`;
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
