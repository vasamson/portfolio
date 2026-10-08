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

    /* ---------- Dessin d'un cycliste (vu de profil, roulant vers la droite) ---------- */
    const riderSVG = (v) => {
        const [jersey, accent] = JERSEYS[v];
        const frame = v === 9 ? "#1a194d" : accent === "#fff" ? "#1a194d" : accent;
        const skin = "#f1c7a3";
        return `
            <svg viewBox="0 0 124 104" aria-hidden="true">
                <ellipse cx="62" cy="99" rx="50" ry="4" fill="currentColor" opacity=".12"/>
                <g class="c-wheel"><circle cx="28" cy="78" r="19" fill="none" stroke="#1a194d" stroke-width="4"/><circle cx="28" cy="78" r="3" fill="#1a194d"/>
                    <path d="M28 61v34M11 78h34" stroke="#94a3b8" stroke-width="1.2"/></g>
                <g class="c-wheel"><circle cx="96" cy="78" r="19" fill="none" stroke="#1a194d" stroke-width="4"/><circle cx="96" cy="78" r="3" fill="#1a194d"/>
                    <path d="M96 61v34M79 78h34" stroke="#94a3b8" stroke-width="1.2"/></g>
                <path d="M28 78 55 79 47 47 28 78M47 47 85 46 55 79M85 46 96 78" fill="none" stroke="${frame}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
                <path d="M41 44h13" stroke="#1a194d" stroke-width="4" stroke-linecap="round"/>
                <path d="M85 46 88 41q6-1 6 5t-5 6" fill="none" stroke="#1a194d" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M49 40 58 60 52 82" fill="none" stroke="#0f172a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
                <path d="M49 40 66 58 60 84" fill="none" stroke="#1a194d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M57 86h9" stroke="#0b1122" stroke-width="4" stroke-linecap="round"/>
                <path d="M48 40 76 27" stroke="${jersey}" stroke-width="15" stroke-linecap="round"/>
                <path d="M51 35 73 25" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>
                <rect x="53" y="33" width="13" height="10" rx="2" fill="#fff" transform="rotate(-24 59 38)"/>
                <text x="59.5" y="41" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="800" font-size="9" fill="#1a194d" transform="rotate(-24 59 38)">${v}</text>
                <path d="M75 28 89 41" stroke="${jersey}" stroke-width="6" stroke-linecap="round"/>
                <path d="M84 37 90 43" stroke="${skin}" stroke-width="4.5" stroke-linecap="round"/>
                <circle cx="85" cy="19" r="8" fill="${skin}"/>
                <path d="M75 18q1-11 12-10 8 1 9 9l-3 1q-9-3-18 0z" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
                <path d="M78 12l3 4M84 10l1 5M90 11l-1 5" stroke="${jersey}" stroke-width="1.6" stroke-linecap="round"/>
                <rect x="86" y="18" width="9" height="4" rx="2" fill="url(#lens)"/>
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
            <div class="rider" data-v="${v}" style="--s:${(0.58 + v * 0.055).toFixed(3)}">
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
