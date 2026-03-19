/* ============================================
   PREMIUM PORTFOLIO — SCRIPT.JS
   ============================================ */

// ─── 1. SMOOTH SCROLL FOR NAV LINKS ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── 2. HEADER: HIDE ON SCROLL DOWN, SHOW ON SCROLL UP ───────────────────────
(function () {
    const header = document.querySelector('.premium-header');
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;

                if (currentScroll > lastScrollY && currentScroll > 120) {
                    // Scrolling down → hide
                    header.style.transform = 'translateY(-110%)';
                } else {
                    // Scrolling up → show
                    header.style.transform = 'translateY(0)';
                }

                // Add background blur intensity when scrolled
                if (currentScroll > 60) {
                    header.style.background = 'rgba(11, 14, 20, 0.82)';
                } else {
                    header.style.background = 'rgba(11, 14, 20, 0.5)';
                }

                lastScrollY = currentScroll <= 0 ? 0 : currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
})();

// ─── 3. ACTIVE NAV LINK ON SCROLL ─────────────────────────────────────────────
(function () {
    const sections   = document.querySelectorAll('section[id]');
    const navLinks   = document.querySelectorAll('.premium-header nav a');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => sectionObserver.observe(s));
})();

// ─── 4. SCROLL REVEAL ─────────────────────────────────────────────────────────
(function () {
    const revealEls = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
})();

// ─── 5. SKILL BARS ANIMATION ──────────────────────────────────────────────────
(function () {
    const skillBars = document.querySelectorAll('.skill-progress');

    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width') || '0';
                // Small delay so CSS transition fires after element is visible
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 150);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));
})();


// ─── 7. PROJECT CARD RIPPLE + STAGGER REVEAL ──────────────────────────────────
(function () {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, i) => {
        // Stagger the delay via inline style for scroll-reveal
        if (card.classList.contains('scroll-reveal')) {
            card.style.transitionDelay = `${i * 0.1}s`;
        }

        // Ripple on click
        card.addEventListener('click', function (e) {
            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top:  ${e.clientY - rect.top  - size / 2}px;
            `;
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
})();

// ─── 8. SOFT-SKILL TAGS STAGGER ANIMATION ─────────────────────────────────────
(function () {
    const tags = document.querySelectorAll('.soft-skill-tag');
    const tagObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            tags.forEach((tag, i) => {
                setTimeout(() => {
                    tag.style.opacity    = '1';
                    tag.style.transform  = 'translateY(0) scale(1)';
                }, i * 80);
            });
            tagObserver.disconnect();
        }
    }, { threshold: 0.2 });

    // Set initial hidden state
    tags.forEach(tag => {
        tag.style.opacity   = '0';
        tag.style.transform = 'translateY(12px) scale(0.93)';
        tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const grid = document.querySelector('.soft-skills-grid');
    if (grid) tagObserver.observe(grid);
})();

// ─── 9. EDUCATION ITEMS STAGGER ───────────────────────────────────────────────
(function () {
    const items = document.querySelectorAll('.education-item');
    const eduObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity   = '1';
                    item.style.transform = 'translateX(0)';
                }, i * 120);
            });
            eduObserver.disconnect();
        }
    }, { threshold: 0.15 });

    items.forEach(item => {
        item.style.opacity   = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const eduSection = document.querySelector('.education-section');
    if (eduSection) eduObserver.observe(eduSection);
})();

// ─── 10. CONTACT ITEMS HOVER GLOW CURSOR ──────────────────────────────────────
(function () {
    const contactCard = document.querySelector('.contact-content');
    if (!contactCard) return;

    contactCard.addEventListener('mousemove', e => {
        const rect = contactCard.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        contactCard.style.background = `
            radial-gradient(circle at ${x}% ${y}%,
                rgba(0, 198, 255, 0.06) 0%,
                rgba(255, 255, 255, 0.03) 60%)
        `;
    });

    contactCard.addEventListener('mouseleave', () => {
        contactCard.style.background = '';
    });
})();

// ─── 11. MOBILE MENU TOGGLE ───────────────────────────────────────────────────
(function () {
    const mobileMenu = document.querySelector('#mobile-menu');
    const navMenu    = document.querySelector('.nav-menu');
    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
})();

// ─── 12. KEYBOARD NAVIGATION SUPPORT ─────────────────────────────────────────
document.addEventListener('keydown',    () => document.body.classList.add('keyboard-navigation'));
document.addEventListener('mousedown',  () => document.body.classList.remove('keyboard-navigation'));

// ─── 13. EASTER EGG: KONAMI CODE ─────────────────────────────────────────────
(function () {
    const pattern = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    let buffer = [];

    document.addEventListener('keydown', e => {
        buffer.push(e.code);
        if (buffer.length > pattern.length) buffer.shift();
        if (buffer.join(',') === pattern.join(',')) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => { document.body.style.animation = ''; }, 4000);
            buffer = [];
        }
    });
})();


// --- 14. SYNAPTIC NEURAL NETWORK BACKGROUND ---
(function () {
    const canvas = document.getElementById('circuit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, targetX, targetY;
    let nodes = [], edges = [], particles = [];
    let animId = null;

    const rand  = (a, b) => a + Math.random() * (b - a);
    const dist2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

    /* ── Resize ── */
    function resize() {
        const hero = document.getElementById('inicio');
        if (!hero) return;
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
        findTarget();
        build();
    }

    function findTarget() {
        const img  = document.getElementById('profileImage');
        const hero = document.getElementById('inicio');
        if (!img || !hero) { targetX = W * 0.75; targetY = H * 0.45; return; }
        const ir = img.getBoundingClientRect();
        const hr = hero.getBoundingClientRect();
        targetX = ir.left - hr.left + ir.width  * 0.5;
        targetY = ir.top  - hr.top  + ir.height * 0.38;
    }

    /* ── Build synaptic web ── */
    function build() {
        nodes = []; edges = []; particles = [];

        /* Hub nodes — first one is always at profile image */
        const hubCount = 10;
        const hubPositions = [{ x: targetX, y: targetY }];
        for (let i = 1; i < hubCount; i++) {
            hubPositions.push({ x: rand(W * 0.04, W * 0.96), y: rand(H * 0.05, H * 0.95) });
        }

        hubPositions.forEach((h, i) => {
            nodes.push({
                x: h.x, y: h.y,
                r:         i === 0 ? rand(18, 24) : rand(9, 17),
                glowR:     i === 0 ? 68           : rand(25, 50),
                phase:     rand(0, Math.PI * 2),
                phaseSpd:  rand(0.012, 0.032),
                hasRing:   i === 0 || Math.random() < 0.45,
                ringR:     rand(20, 36),
                ringAlpha: rand(0.28, 0.65),
                isTarget:  i === 0,
                depth:     rand(0.55, 1.0),
            });
        });

        /* Satellite nodes */
        hubPositions.forEach((h, hi) => {
            const count = hi === 0 ? 7 : (rand(2, 5) | 0);
            for (let s = 0; s < count; s++) {
                const angle = rand(0, Math.PI * 2);
                const r     = rand(55, 210);
                nodes.push({
                    x: clamp(h.x + Math.cos(angle) * r, 5, W - 5),
                    y: clamp(h.y + Math.sin(angle) * r, 5, H - 5),
                    r:        rand(3, 7),
                    glowR:    rand(9, 22),
                    phase:    rand(0, Math.PI * 2),
                    phaseSpd: rand(0.01, 0.025),
                    hasRing:  false,
                    isTarget: false,
                    depth:    rand(0.3, 0.8),
                });
            }
        });

        /* Bezier edges */
        nodes.forEach((n, i) => {
            const k = n.r > 9 ? 4 : 2;
            const nearest = nodes
                .map((m, j) => ({ j, d: dist2(n, m) }))
                .filter(e => e.j !== i && e.d < W * 0.44 && e.d > 18)
                .sort((a, b) => a.d - b.d)
                .slice(0, k);

            nearest.forEach(({ j }) => {
                const key = [Math.min(i, j), Math.max(i, j)].join('-');
                if (!edges.find(e => e.key === key)) {
                    const na = nodes[i], nb = nodes[j];
                    const dx = nb.x - na.x, dy = nb.y - na.y;
                    const bend = rand(0.18, 0.52) * (Math.random() < 0.5 ? 1 : -1);
                    const px = -dy * bend, py = dx * bend;
                    edges.push({
                        key, a: i, b: j,
                        cp1x: na.x + dx * 0.3 + px * 0.5,
                        cp1y: na.y + dy * 0.3 + py * 0.5,
                        cp2x: na.x + dx * 0.7 + px * 0.5,
                        cp2y: na.y + dy * 0.7 + py * 0.5,
                        alpha: rand(0.06, 0.24),
                        width: rand(0.5, 1.6),
                    });
                }
            });
        });

        /* Spawn particles */
        for (let k = 0; k < 65; k++) spawnParticle(0);
    }

    /* ── Cubic bezier point ── */
    function bezierPt(e, t) {
        const na = nodes[e.a], nb = nodes[e.b];
        const mt = 1 - t;
        return {
            x: mt*mt*mt*na.x + 3*mt*mt*t*e.cp1x + 3*mt*t*t*e.cp2x + t*t*t*nb.x,
            y: mt*mt*mt*na.y + 3*mt*mt*t*e.cp1y + 3*mt*t*t*e.cp2y + t*t*t*nb.y,
        };
    }

    /* ── Greedy path to target ── */
    function findPath(startIdx, targetIdx) {
        const visited = new Set();
        const path = [{ nIdx: startIdx, eIdx: -1, rev: false }];
        let cur = startIdx;
        for (let step = 0; step < 90; step++) {
            if (cur === targetIdx) break;
            visited.add(cur);
            const links = edges
                .map((e, ei) => {
                    if (e.a === cur) return { nNext: e.b, ei, rev: false };
                    if (e.b === cur) return { nNext: e.a, ei, rev: true };
                    return null;
                })
                .filter(l => l && !visited.has(l.nNext));
            if (!links.length) break;
            links.sort((a, b) =>
                dist2(nodes[a.nNext], nodes[targetIdx]) -
                dist2(nodes[b.nNext], nodes[targetIdx])
            );
            const best = links[0];
            path.push({ nIdx: best.nNext, eIdx: best.ei, rev: best.rev });
            cur = best.nNext;
        }
        return path;
    }

    /* ── Spawn particle ── */
    function spawnParticle(tIdx) {
        const far = nodes
            .map((n, i) => ({ i, d: dist2(n, nodes[tIdx]) }))
            .filter(e => e.i !== tIdx)
            .sort((a, b) => b.d - a.d);
        if (!far.length) return;
        const startIdx = far[Math.floor(rand(0, Math.min(14, far.length))) | 0].i;
        const path = findPath(startIdx, tIdx);
        if (path.length < 2) return;
        particles.push({
            path, seg: 0,
            t:     rand(0, 1),
            speed: rand(0.003, 0.009),
            size:  rand(2.0, 4.2),
            alpha: rand(0.72, 1.0),
            trail: [],
        });
    }

    /* ── Draw frame ── */
    function draw(ts) {
        ctx.clearRect(0, 0, W, H);

        /* Background: deep blue-black gradient matching reference image */
        const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
        bg.addColorStop(0,    '#010d1c');
        bg.addColorStop(0.5,  '#020f24');
        bg.addColorStop(1,    '#01101e');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        /* Ambient depth blobs */
        [
            [W * 0.20, H * 0.38, 320, 0.14],
            [W * 0.68, H * 0.54, 268, 0.11],
            [W * 0.08, H * 0.78, 200, 0.08],
            [W * 0.50, H * 0.12, 170, 0.07],
            [W * 0.90, H * 0.88, 190, 0.06],
        ].forEach(([cx, cy, r, a]) => {
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            g.addColorStop(0, `rgba(0, 80, 200, ${a})`);
            g.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = g; ctx.fill();
        });

        /* ── Edges / connections (organic bezier curves) ── */
        edges.forEach(e => {
            const avgDepth = (nodes[e.a].depth + nodes[e.b].depth) * 0.5;
            const lw = e.width * avgDepth;

            /* Outer soft glow */
            ctx.beginPath();
            ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
            ctx.bezierCurveTo(e.cp1x, e.cp1y, e.cp2x, e.cp2y, nodes[e.b].x, nodes[e.b].y);
            ctx.strokeStyle = `rgba(0, 175, 255, ${e.alpha * 0.38 * avgDepth})`;
            ctx.lineWidth = lw + 5;
            ctx.stroke();

            /* Core wire */
            ctx.beginPath();
            ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
            ctx.bezierCurveTo(e.cp1x, e.cp1y, e.cp2x, e.cp2y, nodes[e.b].x, nodes[e.b].y);
            ctx.strokeStyle = `rgba(0, 215, 255, ${e.alpha * avgDepth})`;
            ctx.lineWidth = lw;
            ctx.stroke();
        });

        /* ── Nodes ── */
        nodes.forEach(n => {
            n.phase += n.phaseSpd;
            const pulse = 0.78 + 0.22 * Math.sin(n.phase);
            const a = n.depth;

            /* Wide outer aura */
            const outerR = n.glowR * 2.5 * pulse;
            const aura = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, outerR);
            aura.addColorStop(0,   `rgba(0, 190, 255, ${0.30 * a})`);
            aura.addColorStop(0.42,`rgba(0, 120, 255, ${0.13 * a})`);
            aura.addColorStop(1,   'transparent');
            ctx.beginPath(); ctx.arc(n.x, n.y, outerR, 0, Math.PI * 2);
            ctx.fillStyle = aura; ctx.fill();

            /* Inner glow sphere */
            const innerR = n.r * 1.85;
            const inner = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, innerR);
            inner.addColorStop(0,   `rgba(210, 248, 255, ${0.96 * a})`);
            inner.addColorStop(0.4, `rgba(0,   210, 255, ${0.72 * a})`);
            inner.addColorStop(1,   `rgba(0,   100, 255, ${0.10 * a})`);
            ctx.beginPath(); ctx.arc(n.x, n.y, innerR, 0, Math.PI * 2);
            ctx.fillStyle = inner; ctx.fill();

            /* Bright solid core */
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 0.52, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(225, 252, 255, ${0.97 * a})`;
            ctx.fill();

            /* Orbital rings */
            if (n.hasRing) {
                const ringRad = n.ringR * (0.9 + 0.1 * Math.sin(n.phase * 0.6));
                ctx.setLineDash(n.isTarget ? [8, 5] : [5, 9]);
                ctx.beginPath(); ctx.arc(n.x, n.y, ringRad, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 210, 255, ${n.ringAlpha * a * pulse})`;
                ctx.lineWidth   = n.isTarget ? 1.3 : 0.9;
                ctx.stroke();
                ctx.setLineDash([]);

                if (n.isTarget) {
                    /* Second larger ring */
                    ctx.setLineDash([4, 11]);
                    ctx.beginPath(); ctx.arc(n.x, n.y, ringRad * 1.68 * (1 + 0.05 * Math.sin(n.phase * 0.4)), 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(0, 165, 255, ${0.34 * a * pulse})`;
                    ctx.lineWidth   = 0.75;
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
        });

        /* ── Particles ── */
        for (let k = particles.length - 1; k >= 0; k--) {
            const p = particles[k];
            p.t += p.speed;

            if (p.t >= 1) {
                p.t -= 1;
                p.seg++;
                if (p.seg >= p.path.length - 1) {
                    particles.splice(k, 1);
                    spawnParticle(0);
                    continue;
                }
            }

            const seg = p.path[p.seg];
            const e   = edges[seg.eIdx];
            if (!e) { particles.splice(k, 1); spawnParticle(0); continue; }

            const t  = seg.rev ? 1 - p.t : p.t;
            const pt = bezierPt(e, t);

            /* Trail */
            p.trail.unshift({ x: pt.x, y: pt.y });
            if (p.trail.length > 22) p.trail.pop();

            p.trail.forEach((tp, ti) => {
                const fade = 1 - ti / p.trail.length;
                ctx.beginPath();
                ctx.arc(tp.x, tp.y, p.size * fade * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 225, 255, ${p.alpha * fade * 0.5})`;
                ctx.fill();
            });

            /* Halo / glow */
            const hg = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.size * 8);
            hg.addColorStop(0,    `rgba(130, 235, 255, ${p.alpha * 0.88})`);
            hg.addColorStop(0.42, `rgba(0,   190, 255, ${p.alpha * 0.38})`);
            hg.addColorStop(1,    'transparent');
            ctx.beginPath(); ctx.arc(pt.x, pt.y, p.size * 8, 0, Math.PI * 2);
            ctx.fillStyle = hg; ctx.fill();

            /* White core */
            ctx.beginPath(); ctx.arc(pt.x, pt.y, p.size * 0.88, 0, Math.PI * 2);
            ctx.fillStyle = '#e8f9ff';
            ctx.fill();
        }
    }

    /* ── Animation loop ── */
    function loop(ts) { draw(ts || 0); animId = requestAnimationFrame(loop); }

    /* ── Init ── */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { cancelAnimationFrame(animId); resize(); loop(0); }, 150);
    });

    function start() { resize(); loop(0); }

    if (document.readyState === 'complete') { start(); }
    else { window.addEventListener('load', start); }
})();
