/* ==========================================================================
   Mini-jeu : Bubble sort… mais avec des coureurs
   On échange deux coureurs voisins pour ranger le peloton du plus petit
   au plus grand, en un minimum d'échanges (= le nombre d'inversions).
   ========================================================================== */

(() => {
    "use strict";

    const game = document.getElementById("jeu");
    if (!game) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ridersEl = game.querySelector(".game__riders");
    const groundEl = game.querySelector(".game__ground");
    const swapsEl = game.querySelector(".game__swaps");
    const statusEl = game.querySelector(".game__status");
    const shuffleBtn = game.querySelector('[data-act="shuffle"]');
    const stat = (name) => game.querySelector(`[data-stat="${name}"]`);

    /* Maillots par numéro : le plus grand (9) porte le maillot jaune */
    const JERSEYS = {
        1: ["#ef4444", "#fff"], 2: ["#f97316", "#1a194d"], 3: ["#10b981", "#fff"],
        4: ["#3b82f6", "#fff"], 5: ["#8b5cf6", "#fff"], 6: ["#ec4899", "#fff"],
        7: ["#14b8a6", "#1a194d"], 8: ["#e2e8f0", "#ef4444"], 9: ["#ffd84d", "#1a194d"]
    };

    let values = [];
    let riders = [];
    let swaps = 0;
    let minSwaps = 0;
    let busy = false;
    let won = false;

    const wait = (ms) => new Promise((r) => setTimeout(r, reducedMotion ? 0 : ms));
    const isSorted = () => values.every((v, k) => k === 0 || values[k - 1] < v);

    /* ---------- Dessin d'un coureur ---------- */
    const riderSVG = (v) => {
        const [jersey, band] = JERSEYS[v];
        const h = 58 + v * 13;
        const H = h + 30;
        const top = 4;
        const bodyBottom = top + h;
        const visor = top + 24;
        const bib = Math.min(22, h * 0.2);
        return `
            <svg viewBox="0 0 56 ${H}" width="56" height="${H}" aria-hidden="true">
                <rect x="15" y="${bodyBottom - 6}" width="10" height="22" rx="4" fill="#1a194d"/>
                <rect x="31" y="${bodyBottom - 6}" width="10" height="22" rx="4" fill="#1a194d"/>
                <ellipse cx="18" cy="${bodyBottom + 17}" rx="9" ry="5" fill="#0b1122"/>
                <ellipse cx="38" cy="${bodyBottom + 17}" rx="9" ry="5" fill="#0b1122"/>
                <rect x="0" y="${top + h * 0.48}" width="10" height="${Math.max(22, h * 0.28)}" rx="5" fill="${jersey}"/>
                <rect x="46" y="${top + h * 0.48}" width="10" height="${Math.max(22, h * 0.28)}" rx="5" fill="${jersey}"/>
                <rect x="5" y="${top}" width="46" height="${h}" rx="23" fill="${jersey}"/>
                <rect x="5" y="${top + h * 0.62}" width="46" height="8" fill="${band}" opacity=".9"/>
                <rect x="15" y="${top + h * 0.72}" width="26" height="${bib}" rx="3" fill="#fff"/>
                <text x="28" y="${top + h * 0.72 + bib * 0.72}" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="800" font-size="${Math.min(15, h * 0.14)}" fill="#1a194d">${v}</text>
                <path d="M5 ${top + 23} A23 23 0 0 1 51 ${top + 23} Z" fill="#fff"/>
                <path d="M14 ${top + 8} 20 ${top + 18} M28 ${top + 3} 28 ${top + 16} M42 ${top + 8} 36 ${top + 18}" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                <rect x="2" y="${visor}" width="52" height="12" rx="6" fill="#0b1122"/>
                <rect x="8" y="${visor + 2.5}" width="40" height="7" rx="3.5" fill="url(#lens)"/>
                <path d="M22 ${visor + 22} Q28 ${visor + 27} 34 ${visor + 22}" stroke="#1a194d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            </svg>`;
    };

    /* Dégradé des lunettes, défini une seule fois */
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    defs.setAttribute("width", "0");
    defs.setAttribute("height", "0");
    defs.style.position = "absolute";
    defs.innerHTML = '<defs><linearGradient id="lens" x1="0" x2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>';
    game.appendChild(defs);

    /* ---------- Placement ---------- */
    const layout = () => {
        game.style.setProperty("--slot", `${ridersEl.clientWidth / riders.length}px`);
        riders.forEach((r, i) => r.style.setProperty("--i", i));
        [...groundEl.children].forEach((g, i) => g.style.setProperty("--i", i));
        [...swapsEl.children].forEach((b, i) => b.style.setProperty("--i", i));
    };

    const setStats = () => {
        stat("swap").textContent = swaps;
        stat("best").textContent = minSwaps;
    };

    const countInversions = (arr) => {
        let k = 0;
        for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) if (arr[i] > arr[j]) k++;
        return k;
    };

    const build = () => {
        const n = window.innerWidth < 640 ? 6 : 8;
        const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        values = pool.slice(0, n);
        if (isSorted()) [values[0], values[1]] = [values[1], values[0]];
        minSwaps = countInversions(values);
        swaps = 0;
        won = false;

        ridersEl.innerHTML = values.map((v) => `
            <div class="rider" data-v="${v}">
                <span class="rider__num">${v}</span>
                ${riderSVG(v)}
            </div>`).join("");
        riders = [...ridersEl.children];
        groundEl.innerHTML = values.map(() => '<span class="game__spot"></span>').join("");
        swapsEl.innerHTML = values.slice(1).map((_, i) =>
            `<button class="game__swap" type="button" data-i="${i}" aria-label="Échanger les coureurs ${i + 1} et ${i + 2}">⇄</button>`).join("");
        layout();
        setStats();
        statusEl.textContent = `Clique sur ⇄ pour échanger deux voisins et range le peloton du plus petit au plus grand. Record à battre : ${minSwaps} échanges.`;
    };

    /* ---------- Animations ---------- */
    const swap = async (i) => {
        const a = riders[i];
        const b = riders[i + 1];
        a.classList.add("is-hop");
        b.classList.add("is-hop");
        [riders[i], riders[i + 1]] = [b, a];
        [values[i], values[i + 1]] = [values[i + 1], values[i]];
        layout();
        await wait(600);
        a.classList.remove("is-hop");
        b.classList.remove("is-hop");
    };

    const celebrate = async () => {
        riders.forEach((r, i) => {
            r.style.setProperty("--d", `${i * 70}ms`);
            r.classList.add("is-done", "is-win");
        });
        await wait(1400);
        riders.forEach((r) => r.classList.remove("is-win"));
    };

    /* ---------- Jeu ---------- */
    swapsEl.addEventListener("click", async (e) => {
        const btn = e.target.closest(".game__swap");
        if (!btn || busy || won) return;
        const i = Number(btn.dataset.i);
        const good = values[i] > values[i + 1];
        busy = true;
        swaps++;
        setStats();
        await swap(i);
        busy = false;
        statusEl.textContent = good ? "Bien vu !" : "Hmm, ils étaient déjà dans le bon ordre…";
        if (isSorted()) {
            won = true;
            statusEl.textContent = swaps === minSwaps
                ? `Parfait ! Trié en ${swaps} échanges, le minimum possible. Maillot jaune !`
                : `Peloton rangé en ${swaps} échanges. Le minimum était ${minSwaps} : tente un nouveau peloton !`;
            busy = true;
            await celebrate();
            busy = false;
        }
    });

    shuffleBtn.addEventListener("click", () => { if (!busy) build(); });

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layout, 120);
    });

    build();
})();
