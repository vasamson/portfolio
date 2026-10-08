/* ==========================================================================
   Mini-jeu : Bubble sort… mais avec des coureurs
   - Mode « Regarder » : l'algorithme trie les coureurs, la ligne de code
     en cours est surlignée.
   - Mode « Jouer » : on échange soi-même deux coureurs voisins pour les
     ranger du plus petit au plus grand, en un minimum d'échanges.
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
    const runBtn = game.querySelector('[data-act="run"]');
    const stepBtn = game.querySelector('[data-act="step"]');
    const shuffleBtn = game.querySelector('[data-act="shuffle"]');
    const speedInput = game.querySelector('[data-act="speed"]');
    const tabs = [...game.querySelectorAll(".game__tab")];
    const codeLines = [...document.querySelectorAll(".code__line")];
    const stat = (name) => game.querySelector(`[data-stat="${name}"]`);
    const bestBox = game.querySelector(".game__best");

    /* Maillots par numéro : le plus grand (9) porte le maillot jaune */
    const JERSEYS = {
        1: ["#ef4444", "#fff"], 2: ["#f97316", "#1a194d"], 3: ["#10b981", "#fff"],
        4: ["#3b82f6", "#fff"], 5: ["#8b5cf6", "#fff"], 6: ["#ec4899", "#fff"],
        7: ["#14b8a6", "#1a194d"], 8: ["#e2e8f0", "#ef4444"], 9: ["#ffd84d", "#1a194d"]
    };

    let mode = "watch";
    let values = [];          // valeurs dans l'ordre affiché
    let riders = [];          // éléments DOM dans l'ordre affiché
    let speed = 1;
    let running = false;
    let steps = null;         // générateur de l'algorithme
    let busy = false;         // animation en cours
    let counts = { cmp: 0, swap: 0 };
    let minSwaps = 0;

    const wait = (ms) => new Promise((r) => setTimeout(r, reducedMotion ? 0 : ms / speed));

    /* ---------- Dessin d'un coureur ---------- */
    const riderSVG = (v) => {
        const [jersey, band] = JERSEYS[v];
        const h = 58 + v * 13;          // taille du corps selon le numéro
        const H = h + 30;               // + jambes
        const top = 4;
        const bodyBottom = top + h;
        const visor = top + 24;
        return `
            <svg viewBox="0 0 56 ${H}" width="56" height="${H}" aria-hidden="true">
                <rect x="15" y="${bodyBottom - 6}" width="10" height="22" rx="4" fill="#1a194d"/>
                <rect x="31" y="${bodyBottom - 6}" width="10" height="22" rx="4" fill="#1a194d"/>
                <ellipse cx="18" cy="${bodyBottom + 17}" rx="9" ry="5" fill="#0b1122"/>
                <ellipse cx="38" cy="${bodyBottom + 17}" rx="9" ry="5" fill="#0b1122"/>
                <rect class="r-arm r-arm--l" x="0" y="${top + h * 0.48}" width="10" height="${Math.max(22, h * 0.28)}" rx="5" fill="${jersey}"/>
                <rect class="r-arm r-arm--r" x="46" y="${top + h * 0.48}" width="10" height="${Math.max(22, h * 0.28)}" rx="5" fill="${jersey}"/>
                <rect x="5" y="${top}" width="46" height="${h}" rx="23" fill="${jersey}"/>
                <rect x="5" y="${top + h * 0.62}" width="46" height="8" fill="${band}" opacity=".9"/>
                <rect x="15" y="${top + h * 0.72}" width="26" height="${Math.min(22, h * 0.2)}" rx="3" fill="#fff"/>
                <text x="28" y="${top + h * 0.72 + Math.min(22, h * 0.2) * 0.72}" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="800" font-size="${Math.min(15, h * 0.14)}" fill="#1a194d">${v}</text>
                <path d="M5 ${top + 23} A23 23 0 0 1 51 ${top + 23} Z" fill="#fff"/>
                <path d="M14 ${top + 8} 20 ${top + 18} M28 ${top + 3} 28 ${top + 16} M42 ${top + 8} 36 ${top + 18}" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>
                <rect x="2" y="${visor}" width="52" height="12" rx="6" fill="#0b1122"/>
                <rect x="8" y="${visor + 2.5}" width="40" height="7" rx="3.5" fill="url(#lens)"/>
                <path class="r-mouth" d="M22 ${visor + 22} Q28 ${visor + 27} 34 ${visor + 22}" stroke="#1a194d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
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
        const n = riders.length;
        const slot = ridersEl.clientWidth / n;
        game.style.setProperty("--slot", `${slot}px`);
        riders.forEach((r, i) => r.style.setProperty("--i", i));
        [...groundEl.children].forEach((g, i) => g.style.setProperty("--i", i));
        [...swapsEl.children].forEach((b, i) => b.style.setProperty("--i", i));
    };

    const countInversions = (arr) => {
        let k = 0;
        for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) if (arr[i] > arr[j]) k++;
        return k;
    };

    const setStats = () => {
        stat("cmp").textContent = counts.cmp;
        stat("swap").textContent = counts.swap;
        stat("best").textContent = minSwaps;
    };

    const highlight = (line) => codeLines.forEach((l) => l.classList.toggle("is-on", Number(l.dataset.line) === line));

    const build = () => {
        const n = window.innerWidth < 640 ? 6 : 8;
        const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        values = pool.slice(0, n);
        if (values.every((v, i) => i === 0 || values[i - 1] < v)) [values[0], values[1]] = [values[1], values[0]];
        minSwaps = countInversions(values);
        counts = { cmp: 0, swap: 0 };

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
        highlight(0);
        steps = null;
    };

    /* ---------- Animations élémentaires ---------- */
    const compare = async (i, j) => {
        riders[i].classList.add("is-cmp");
        riders[j].classList.add("is-cmp");
        await wait(650);
    };
    const release = (i, j) => {
        riders[i]?.classList.remove("is-cmp");
        riders[j]?.classList.remove("is-cmp");
    };
    const swap = async (i, j) => {
        const a = riders[i];
        const b = riders[j];
        a.classList.add("is-hop");
        b.classList.add("is-hop");
        [riders[i], riders[j]] = [b, a];
        [values[i], values[j]] = [values[j], values[i]];
        layout();
        await wait(600);
        a.classList.remove("is-hop");
        b.classList.remove("is-hop");
    };
    const markDone = (k) => riders[k] && riders[k].classList.add("is-done");

    const celebrate = async () => {
        riders.forEach((r, i) => { r.classList.add("is-done"); r.style.setProperty("--d", `${i * 70}ms`); r.classList.add("is-win"); });
        await wait(1400);
        riders.forEach((r) => r.classList.remove("is-win"));
    };

    /* ---------- L'algorithme, étape par étape ---------- */
    function* bubble() {
        const n = values.length;
        yield { line: 2 };
        for (let p = 0; p < n - 1; p++) {
            yield { line: 3 };
            let swapped = false;
            yield { line: 4 };
            for (let i = 0; i < n - 1 - p; i++) {
                yield { line: 5 };
                yield { line: 6, cmp: [i, i + 1] };
                if (values[i] > values[i + 1]) {
                    yield { line: 7, swap: [i, i + 1] };
                    swapped = true;
                    yield { line: 8 };
                }
                yield { release: [i, i + 1] };
            }
            yield { done: n - 1 - p };
            yield { line: 9 };
            if (!swapped) {
                yield { line: 10 };
                break;
            }
        }
        yield { finished: true };
    }

    const apply = async (s) => {
        if (s.line !== undefined) highlight(s.line);
        if (s.cmp) {
            counts.cmp++;
            setStats();
            const [a, b] = s.cmp;
            statusEl.textContent = `Le n°${values[a]} se compare au n°${values[b]}…`;
            await compare(a, b);
            return;
        }
        if (s.swap) {
            counts.swap++;
            setStats();
            const [a, b] = s.swap;
            statusEl.textContent = `${values[a]} > ${values[b]} : ils échangent leur place !`;
            await swap(a, b);
            return;
        }
        if (s.release) { release(...s.release); return; }
        if (s.done !== undefined) { markDone(s.done); return; }
        if (s.finished) {
            highlight(0);
            statusEl.textContent = `Peloton rangé : ${counts.cmp} comparaisons et ${counts.swap} échanges.`;
            await celebrate();
            stop(true);
            return;
        }
        await wait(220);
    };

    const nextStep = async () => {
        if (!steps) steps = bubble();
        const { value, done } = steps.next();
        if (done) return false;
        await apply(value);
        return !value.finished;
    };

    /* ---------- Contrôles ---------- */
    const setRunLabel = (txt) => { runBtn.querySelector("span").textContent = txt; };

    const stop = (finished = false) => {
        running = false;
        setRunLabel(finished ? "Rejouer" : "Reprendre");
        if (finished) steps = "finished";
    };

    const run = async () => {
        if (steps === "finished") { build(); }
        running = true;
        setRunLabel("Pause");
        while (running) {
            busy = true;
            const more = await nextStep();
            busy = false;
            if (!more) break;
        }
    };

    runBtn.addEventListener("click", () => {
        if (mode !== "watch") return;
        if (running) stop();
        else if (!busy) run();
    });

    stepBtn.addEventListener("click", async () => {
        if (mode !== "watch" || running || busy) return;
        if (steps === "finished") build();
        busy = true;
        const more = await nextStep();
        busy = false;
        if (!more && steps !== "finished") stop(true);
    });

    shuffleBtn.addEventListener("click", () => {
        if (busy && running) stop();
        const reset = () => {
            build();
            setRunLabel("Lancer");
            statusEl.textContent = mode === "watch"
                ? "Nouveau peloton ! Appuie sur Lancer pour le trier."
                : `Nouveau peloton ! Range-le en ${minSwaps} échanges si tu peux.`;
        };
        if (busy) setTimeout(reset, 700); else reset();
    });

    speedInput.addEventListener("input", () => { speed = Number(speedInput.value); });

    /* ---------- Mode jeu : on échange soi-même ---------- */
    swapsEl.addEventListener("click", async (e) => {
        const btn = e.target.closest(".game__swap");
        if (!btn || mode !== "play" || busy) return;
        if (riders.every((r) => r.classList.contains("is-win"))) return;
        const i = Number(btn.dataset.i);
        busy = true;
        counts.cmp++;
        if (values[i] > values[i + 1]) {
            counts.swap++;
            setStats();
            await swap(i, i + 1);
            statusEl.textContent = "Bien vu !";
        } else {
            counts.swap++;
            setStats();
            await swap(i, i + 1);
            statusEl.textContent = "Hmm, ils étaient déjà dans le bon ordre…";
        }
        busy = false;
        if (values.every((v, k) => k === 0 || values[k - 1] < v)) {
            const perfect = counts.swap === minSwaps;
            statusEl.textContent = perfect
                ? `Parfait ! Trié en ${counts.swap} échanges, le minimum possible. Maillot jaune !`
                : `Trié en ${counts.swap} échanges. Le minimum était ${minSwaps} : retente ta chance avec Mélanger.`;
            busy = true;
            await celebrate();
            busy = false;
        }
    });

    const setMode = (m) => {
        if (running) stop();
        mode = m;
        tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.mode === m)));
        game.classList.toggle("is-play", m === "play");
        bestBox.hidden = m !== "play";
        build();
        setRunLabel("Lancer");
        statusEl.textContent = m === "watch"
            ? "Appuie sur Lancer : chaque coureur compare sa taille à son voisin, et le plus grand passe derrière."
            : `À toi ! Clique sur ⇄ pour échanger deux voisins et range le peloton du plus petit au plus grand. Minimum : ${minSwaps} échanges.`;
    };
    tabs.forEach((t) => t.addEventListener("click", () => setMode(t.dataset.mode)));

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layout, 120);
    });

    build();
})();
