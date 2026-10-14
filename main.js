/* Lili Monaco — interactions : film d'introduction, révélations, galerie, avis, visionneuse.
   Aucune dépendance : JavaScript natif. */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => (Number.isFinite(v) ? Math.min(b, Math.max(a, v)) : a);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isSmall = () => matchMedia('(max-width: 820px)').matches;
  const html = document.documentElement;
  const LM = window.LM || { groups: [], photos: [], reviews: [] };
  const nf = (n, d = 0) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const eur = n => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const img = (n, tag) => 'lm-' + String(n).padStart(2, '0') + '-' + tag + '.webp';

  /* ============================================================
     1. PRÉCHARGEMENT + FILM D'INTRODUCTION
     ============================================================ */
  const hero = $('#accueil');
  const video = $('#heroVideo');
  const loader = $('#loader');
  const fill = $('#loaderFill');
  let revealed = false, tick = 0;

  function reveal() {
    if (revealed) return;
    revealed = true;
    fill.style.transform = 'scaleX(1)';
    hero.classList.add('is-ready');
    loader.classList.add('is-done');
    html.classList.remove('is-loading');
    setTimeout(() => { loader.style.display = 'none'; }, 1500);
    startVideo();
  }
  // barre de progression « de confiance » (le site est léger), le film démarre dès qu'il peut
  const t0 = performance.now();
  (function bar() {
    if (revealed) return;
    fill.style.transform = 'scaleX(' + clamp((performance.now() - t0) / 1600) + ')';
    tick = requestAnimationFrame(bar);
  })();
  const poster = new Image();
  const posterReady = new Promise(r => { poster.onload = poster.onerror = r; });
  poster.src = isSmall() ? 'hero-poster-m.webp' : 'hero-poster.webp';
  Promise.all([posterReady, new Promise(r => setTimeout(r, reduce ? 200 : 1700))]).then(reveal);
  setTimeout(reveal, 5000);

  function startVideo() {
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    if (saveData || reduce) return;
    video.poster = isSmall() ? 'hero-poster-m.webp' : 'hero-poster.webp';
    video.src = isSmall() ? 'hero-mobile.mp4' : 'hero.mp4';
    // le film n'apparaît qu'une fois réellement lancé : si la lecture automatique est refusée, l'image d'accueil reste seule
    video.addEventListener('playing', () => { hero.classList.add('has-video'); }, { once: true });
    video.addEventListener('canplay', () => {
      const p = video.play(); if (p && p.catch) p.catch(() => {});
    }, { once: true });
    video.addEventListener('error', () => { hero.classList.remove('has-video'); }, { once: true });
    video.load();
  }
  // pas de lecture en tâche de fond quand le héros n'est plus visible
  let heroOn = true;
  new IntersectionObserver(es => {
    es.forEach(e => { heroOn = e.isIntersecting; if (!hero.classList.contains('has-video')) return; if (heroOn) video.play().catch(() => {}); else video.pause(); });
  }, { threshold: 0.05 }).observe(hero);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && heroOn && hero.classList.contains('has-video')) video.play().catch(() => {});
  });

  /* ============================================================
     2. EN-TÊTE, MENU, BARRES MOBILES
     ============================================================ */
  const head = $('#head'), burger = $('#burger'), menu = $('#menu'), stickybar = $('#stickybar'), book = $('#reserver');
  let lastY = scrollY;
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.setAttribute('aria-hidden', String(!open));
  }
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  function onScroll() {
    const y = scrollY;
    const solid = y > 60;
    head.classList.toggle('is-solid', solid);
    const hb = hero.getBoundingClientRect().bottom;
    if (hb < 0 && y > lastY + 6 && !document.body.classList.contains('menu-open')) head.classList.add('is-hidden');
    else if (y < lastY - 6 || hb >= 0) head.classList.remove('is-hidden');
    lastY = y;
    const bk = book.getBoundingClientRect();
    const inBook = bk.top < innerHeight * .8 && bk.bottom > innerHeight * .2;
    stickybar.classList.toggle('is-on', hb < 0 && !inBook);
    const side = $('#flowSide'); if (side) side.classList.toggle('is-on', inBook);
    updateManifesto(); updateParallax();
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* ============================================================
     3. RÉVÉLATIONS, TITRES MOT À MOT, COMPTEURS
     ============================================================ */
  function splitWords(root) {
    let i = 0;
    const walk = node => {
      Array.from(node.childNodes).forEach(c => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
      });
    };
    walk(root);
  }
  $$('[data-split]').forEach(splitWords);

  $$('[data-count]').forEach(el => { el.textContent = nf(0, +el.dataset.dec || 0); });
  function countUp(el) {
    const to = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
    if (reduce) { el.textContent = nf(to, dec); return; }
    const s = performance.now(), dur = 1800;
    (function step(t) {
      const k = clamp((t - s) / dur);
      el.textContent = nf(to * (1 - Math.pow(1 - k, 4)), dec);
      if (k < 1) requestAnimationFrame(step);
    })(s);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: .16, rootMargin: '0px 0px -6% 0px' });
  const observeAll = () => $$('[data-reveal],[data-split]').forEach(el => { if (!el.dataset.obs) { el.dataset.obs = 1; io.observe(el); } });
  observeAll();

  const man = $('#manifesto'); const words = [];
  (function () {
    const walk = node => Array.from(node.childNodes).forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const s = document.createElement('span'); s.className = 'mw'; s.textContent = p; words.push(s); frag.appendChild(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) walk(c);
    });
    walk(man);
  })();
  let lit = 0;
  function updateManifesto() {
    const r = man.getBoundingClientRect();
    const p = clamp((innerHeight * .86 - r.top) / (r.height + innerHeight * .1));
    const n = Math.min(words.length, reduce ? words.length : Math.round(p * words.length * 1.15));
    if (n === lit) return;
    if (n > lit) for (let i = lit; i < n; i++) words[i].classList.add('on'); else for (let i = n; i < lit; i++) words[i].classList.remove('on');
    lit = n;
  }
  const pxImgs = $$('[data-parallax]');
  function updateParallax() {
    if (reduce) return;
    for (const im of pxImgs) {
      const r = im.parentElement.getBoundingClientRect();
      if (r.bottom < -60 || r.top > innerHeight + 60) continue;
      const k = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
      im.style.transform = 'translate3d(0,' + (clamp(k, -1, 1) * -6).toFixed(2) + '%,0)';
    }
  }

  /* ============================================================
     4. PRESTATIONS SIGNATURE (cartes empilées)
     ============================================================ */
  const sigList = $('#sigList');
  LM.groups.map(g => g.id).forEach((gid, i) => {
    const g = LM.groups.find(x => x.id === gid); if (!g) return;
    const core = g.items.filter(x => x.main);                 // prestations principales (hors retouches, options et compléments)
    const min = Math.min(...core.map(x => x.price));
    const phoneOnly = core.every(x => x.call);
    const art = document.createElement('article');
    art.className = 'sigcard'; art.style.setProperty('--i', i);
    art.innerHTML =
      '<div class="sigcard__img"><img src="' + img(g.photo, 's') + '" srcset="' + img(g.photo, 's') + ' 720w, ' + img(g.photo, 'l') + ' 1600w" sizes="(max-width:1100px) 92vw, 52vw" alt="' + ((LM.photos.find(x => x.n === g.photo) || {}).alt || g.title + ' : résultat') + '" loading="lazy" decoding="async"></div>' +
      '<div class="sigcard__txt"><span class="sigcard__n">0' + (i + 1) + '</span><p class="sigcard__k">' + g.kicker + '</p><h3>' + g.title + '</h3><p>' + g.intro + '</p>' +
      '<p class="sigcard__from">À partir de <b>' + eur(min) + '</b>' + (phoneOnly ? ' · réservation par téléphone' : '') + '</p>' +
      '<a class="btn btn--gold btn--magnetic" href="#reserver" data-open="' + gid + '"><span>Voir les prestations</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a></div>';
    sigList.appendChild(art);
  });
  sigList.addEventListener('click', e => {
    const a = e.target.closest('[data-open]'); if (!a) return;
    if (window.LiliBooking) window.LiliBooking.openGroup(a.dataset.open);
  });

  /* ============================================================
     5. GALERIE + VISIONNEUSE
     ============================================================ */
  const gal = $('#gallery');
  const order = [13, 2, 24, 1, 8, 20, 4, 12, 22, 7, 9, 15, 3, 26, 5, 10, 28, 16, 19, 30, 11, 25, 17, 6, 27, 14, 21, 18, 29, 23];
  const byN = Object.fromEntries(LM.photos.map(p => [p.n, p]));
  order.forEach(n => {
    const p = byN[n]; if (!p) return;
    const f = document.createElement('figure');
    f.className = 'gal'; f.dataset.tag = p.tag; f.dataset.n = n; f.tabIndex = 0; f.setAttribute('role', 'button');
    f.innerHTML = '<img src="' + img(n, 's') + '" width="' + p.w + '" height="' + p.h + '" alt="' + p.alt + '" loading="lazy" decoding="async">';
    gal.appendChild(f);
  });
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let lbIdx = 0, lbFocus = null;
  const vis = () => $$('.gal', gal).filter(f => !f.classList.contains('is-off'));
  function openLb(i) {
    const list = vis(); lbIdx = (i + list.length) % list.length;
    const f = list[lbIdx], n = f.dataset.n;
    lbImg.src = img(n, 'l'); lbImg.alt = f.querySelector('img').alt; lbCap.textContent = f.querySelector('img').alt + ' · ' + (lbIdx + 1) + ' / ' + list.length;
    if (lb.hidden) { lbFocus = document.activeElement; lb.hidden = false; document.body.classList.add('lb-open'); $('#lbClose').focus(); }
  }
  function closeLb() { lb.hidden = true; document.body.classList.remove('lb-open'); lbImg.removeAttribute('src'); if (lbFocus) lbFocus.focus(); }
  gal.addEventListener('click', e => { const f = e.target.closest('.gal'); if (f) openLb(vis().indexOf(f)); });
  gal.addEventListener('keydown', e => { const f = e.target.closest('.gal'); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLb(vis().indexOf(f)); } });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => openLb(lbIdx - 1));
  $('#lbNext').addEventListener('click', () => openLb(lbIdx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') openLb(lbIdx - 1); if (e.key === 'ArrowRight') openLb(lbIdx + 1);
  });
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) openLb(lbIdx + (dx < 0 ? 1 : -1)); }, { passive: true });
  $('#chips').addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    $$('.chip').forEach(x => { x.classList.toggle('is-on', x === c); x.setAttribute('aria-selected', String(x === c)); });
    $$('.gal', gal).forEach(f => f.classList.toggle('is-off', c.dataset.f !== 'all' && f.dataset.tag !== c.dataset.f));
  });

  /* ============================================================
     6. AVIS
     ============================================================ */
  const revRow = $('#revRow');
  const fmtMonth = d => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const cards = LM.reviews.map(r => '<figure class="rev"><blockquote>' + r.text.replace(/\s+/g, ' ').replace(/</g, '&lt;') + '</blockquote><figcaption><span class="stars" aria-label="5 étoiles sur 5"></span><span>Cliente · ' + fmtMonth(r.date) + '</span></figcaption></figure>').join('');
  revRow.innerHTML = cards + cards.replace(/<figure class="rev">/g, '<figure class="rev" aria-hidden="true">');

  /* ============================================================
     7. DÉTAILS : curseur, boutons magnétiques, carte, année
     ============================================================ */
  if (finePointer && !reduce) {
    const cur = $('#cursor'); let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; cur.classList.add('is-on'); }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => cur.classList.remove('is-on'));
    (function loop() { cx += (x - cx) * .24; cy += (y - cy) * .24; cur.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)'; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => {
      const view = !!e.target.closest('.gal');
      const link = !view && !!e.target.closest('a,button:not(.cday):not(.slot),summary,.mrow__add');
      cur.classList.toggle('is-view', view); cur.classList.toggle('is-link', link);
    });
    $$('.btn--magnetic').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .2).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .28).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }
  $('#mapBtn').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.title = 'Carte OpenStreetMap : zone de Dauphin, entre Forcalquier et Manosque';
    f.loading = 'lazy';
    f.src = 'https://www.openstreetmap.org/export/embed.html?bbox=5.6900%2C43.8500%2C5.8700%2C43.9500&layer=mapnik';   // zone approximative, sans repère : l'adresse n'est donnée qu'après la réservation
    $('#map').appendChild(f); $('#mapBtn').remove();
  });
  const faq = $$('.faq__list details');
  faq.forEach(d => d.addEventListener('toggle', () => { if (d.open) faq.forEach(o => { if (o !== d) o.open = false; }); }));
  $('#year').textContent = new Date().getFullYear();
  onScroll();
})();
